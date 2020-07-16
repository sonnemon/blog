import React, { useState, Fragment, useRef } from "react";
import {
  Form,
  Button,
  Header,
  Image,
  Checkbox,
  Segment,
} from "semantic-ui-react";
import config from "../../config";
import { uploadImageDisplay } from "../../api/image";
export default function ImagItem(props) {
  const {
    isEdit,
    field,
    callback,
    setIsEdit,
    index,
    isOnlyRead = false,
  } = props;
  const [data, setData] = useState(() => initialState(field.data));
  const [hasEdited, setHasEdited] = useState(false);
  const inputFileRef = useRef();
  function handleChange(type, value) {
    if (type == "value" && !hasEdited) {
      setHasEdited((prev) => !prev);
    }
    setData({
      ...data,
      [type]: value,
    });
  }
  async function handleSave() {
    if (field.data.value != data.value) {
      let nameImage = await uploadImageDisplay(data.value);
      setData({
        ...data,
        value: nameImage,
      });
      setHasEdited((prev) => !prev);
      callback(
        {
          ...field,
          data: {
            ...data,
            value: nameImage,
          },
        },
        index
      );
    } else {
      callback({ ...field, data }, index);
    }
    setIsEdit((prev) => !prev);
  }
  if (isOnlyRead) return <Present data={data} />;

  return (
    <Fragment>
      {isEdit ? (
        <Form onSubmit={(_e) => _e.preventDefault()}>
          <Form.Field>
            <Segment textAlign="center">
              <Segment basic>
                <Image
                  src={hasEdited ? data.value : `${config.api}${data.value}`}
                  size="medium"
                  centered
                />
              </Segment>
              <Button
                color="orange"
                onClick={() => {
                  inputFileRef.current.click();
                }}
                type="button"
                content="Browser file"
                icon="upload"
                size="small"
              />
              <input
                type="file"
                className="hiddenInput"
                ref={inputFileRef}
                onChange={(e) => {
                  handleChange("value", URL.createObjectURL(e.target.files[0]));
                }}
              />
            </Segment>
          </Form.Field>
          <Form.Group widths="equal">
            <Form.Select
              label="Size"
              placeholder="Select one..."
              value={data.size}
              options={[
                { key: "mini", value: "mini", text: "mini" },
                { key: "tiny", value: "tiny", text: "tiny" },
                { key: "small", value: "small", text: "small" },
                { key: "medium", value: "medium", text: "medium" },
                { key: "large", value: "large", text: "large" },
                { key: "big", value: "big", text: "big" },
                { key: "huge", value: "huge", text: "huge" },
                { key: "massive", value: "massive", text: "massive" },
              ]}
              onChange={(_e, { value }) => handleChange("size", value)}
            />
            <Form.Field>
              <label>Is centered?</label>
              <Checkbox
                toggle
                checked={data.isCentered}
                onChange={(_e, { checked }) =>
                  handleChange("isCentered", checked)
                }
              />
            </Form.Field>
          </Form.Group>

          <Button
            type="button"
            fluid
            content="Save"
            color="teal"
            onClick={handleSave}
          />
        </Form>
      ) : (
        <Present data={data} />
      )}
      <style jsx>{`
        .hiddenInput {
          display: none;
        }
      `}</style>
    </Fragment>
  );
}

const Present = ({ data }) => {
  return (
    <Image
      centered={data.isCentered}
      src={`${config.api}/${data.value}`}
      size={data.size}
    />
  );
};
function initialState(initialValues) {
  return {
    value: "https://react.semantic-ui.com/images/wireframe/image.png",
    size: "tiny",
    isCentered: false,
    ...initialValues,
  };
}
