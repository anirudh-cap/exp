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
`;
