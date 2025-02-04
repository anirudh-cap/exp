import { css } from 'styled-components';

export default css`
  .requests-container {
    width: 85vw;
    margin: auto;
    padding: 20px 0;
  }

  .top-section {
    margin-bottom: 20px;
    align-items: center;
    justify-content: space-between;
  }

  .input-field {
    width: 100%;
    margin-bottom: 20px;
  }

  .ant-modal.cap-modal-v2 {
    max-width: 1000px !important;
  }

  .ant-input-group-addon {
    width: 20%;
  }

  .search-section {
    margin-bottom: 20px;
    width: 40%;
    justify-content: space-between;
    align-items: center;
  }

  .ant-select-selection {
    width: 200px !important;
  }

  .cap-button-v2.cancel-btn {
    background-color: #ee4b2b;
  }

  .cap-button-v2.cancel-btn:hover {
    background-color: #880808;
  }

  .cap-button-v2.request-btn {
    background-color: #a89532;
  }

  .cap-button-v2.request-btn:hover {
    background-color: #a88932;
  }
`;
