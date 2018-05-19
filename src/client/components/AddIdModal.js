import React from 'react';
import { Modal, Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Z_FIXED } from 'zlib';

const AddIdModal = props => (
  <Modal
    size="tiny"
    open={props.isOpen}
    onClose={props.onClose}
    style={{ position: 'fixed', top: '40vh', left: '30vw' }}
  >
    <Modal.Header>IDを入力してください。</Modal.Header>
    <Modal.Content>
      <Input
        size="large"
        onChange={props.onChange}
        placeholder="適当なIDを入力してください"
      />
    </Modal.Content>
    <Modal.Actions>
      <Link to={props.inputId}>追加する</Link>
    </Modal.Actions>
  </Modal>
);

export default AddIdModal;
