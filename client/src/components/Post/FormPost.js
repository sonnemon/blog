import React, { useRef, useState } from "react";
import {
  Form,
  Checkbox,
  Segment,
  Message,
  Button,
  Image,
} from "semantic-ui-react";
import { uploadImage } from "../../api/image";
import config from "../../config";

export default function FormPost(props) {
  const { isCreate = false, callback, loading, defaultValues = {} } = props;
  const inputFileRef = useRef();
  const [errors, setErros] = useState([]);
  const [hasEdited, setHasEdited] = useState(false);
  const [formValues, setFormValues] = useState(() =>
    initialState(defaultValues)
  );

  function handleChangeValues(key, value) {
    if (key == "coverImage" && !hasEdited) {
      setHasEdited((prev) => !prev);
    }
    setFormValues((prev) => ({ ...prev, [key]: value }));
  }
  async function handleSubmitForm() {
    let listErrors = [];
    setErros([]);
    if (!formValues.title) {
      listErrors.push("Complete the field TITLE");
    }
    if (!formValues.seed) {
      listErrors.push("Complete the field SEED");
    }
    if (formValues.coverImage == null) {
      listErrors.push("Select some image");
    }
    if (listErrors.length > 0) {
      setErros(listErrors);
    } else {
      let coverImage = formValues.coverImage;
      if (hasEdited) {
        coverImage = await uploadImage(formValues.coverImage);
        setHasEdited((prev) => !prev);
      }
      setFormValues({
        ...formValues,
        coverImage,
      });
      callback({
        ...formValues,
        coverImage,
      });
    }
  }
  return (
    <Segment loading={loading}>
      <Form
        onSubmit={(e) => e.preventDefault()}
        encType={"multipart/form-data"}
      >
        <Form.Group>
          <Form.Input
            fluid
            width={12}
            label="Title"
            placeholder="Post title..."
            value={formValues.title}
            onChange={(e, { value }) => {
              handleChangeValues("title", value);
            }}
          />
          <Form.Field width={4}>
            <label>Status</label>
            <Checkbox
              toggle
              disabled={isCreate}
              checked={formValues.status}
              onChange={(e, { checked }) => {
                handleChangeValues("status", checked);
              }}
            />
          </Form.Field>
        </Form.Group>
        <Form.TextArea
          label="Post seed"
          placeholder="Little resume..."
          value={formValues.seed}
          onChange={(e, { value }) => {
            handleChangeValues("seed", value);
          }}
        />
        <Form.Field>
          <Segment textAlign="center">
            <Segment basic>
              <Image
                src={
                  hasEdited
                    ? formValues.coverImage
                    : `${config.api}${formValues.coverImage}`
                }
                size="medium"
                centered
              />
            </Segment>
            <Button
              color="green"
              onClick={() => {
                inputFileRef.current.click();
              }}
              type="button"
              content="Browser file"
              icon="upload"
              size="massive"
            />
            <input
              type="file"
              className="hiddenInput"
              ref={inputFileRef}
              onChange={(e) => {
                handleChangeValues(
                  "coverImage",
                  URL.createObjectURL(e.target.files[0])
                );
              }}
            />
          </Segment>
        </Form.Field>
        <Form.Button
          fluid
          color="blue"
          onClick={handleSubmitForm}
          content="Send"
        />
        {errors.length > 0 && (
          <Message color="red">
            <Message.Header>Solve next errors</Message.Header>
            <Message.List items={errors} />
          </Message>
        )}
      </Form>
      <style jsx>{`
        .hiddenInput {
          display: none;
        }
      `}</style>
    </Segment>
  );
}

function initialState(defaultValues) {
  return {
    title: "title" in defaultValues ? defaultValues.title : "",
    status: "status" in defaultValues ? defaultValues.status : false,
    seed: "seed" in defaultValues ? defaultValues.seed : "",
    coverImage:
      "coverImage" in defaultValues
        ? `${defaultValues.coverImage}`
        : "/images/posts/display/default.png",
  };
}
