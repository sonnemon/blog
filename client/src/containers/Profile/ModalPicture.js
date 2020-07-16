import React, { useState, useRef } from "react";
import config from "../../config";
import { Button, Modal, Segment, Image } from "semantic-ui-react";

export default function ModalPicture(props) {
  const { callback, open, loading } = props;
  const inputFileRef = useRef();
  const [hasEdited, setHasEdited] = useState(false);
  const [picture, setPicture] = useState(props.picture);
  function handleSave() {
    callback(true, picture);
  }
  return (
    <Modal size="tiny" open={open} onClose={() => callback(false)}>
      <Modal.Header>Update Profile</Modal.Header>
      <Modal.Content>
        <Segment textAlign="center">
          <Segment basic>
            <Image
              src={hasEdited ? picture : `${config.api}/${picture}`}
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
              setPicture(URL.createObjectURL(e.target.files[0]));
              if (!hasEdited) {
                setHasEdited((prev) => !prev);
              }
            }}
          />
        </Segment>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => callback(false)} disabled={loading}>
          No
        </Button>
        <Button
          positive
          content="Accept"
          disabled={loading}
          onClick={handleSave}
        />
      </Modal.Actions>
      <style jsx>{`
        .hiddenInput {
          display: none;
        }
      `}</style>
    </Modal>
  );
}
