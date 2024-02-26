import React from 'react';
import './pagination.css';

import { Pagination } from 'antd';

const PaginationType = ({ getCurrentPage, currentPage, totalPages }) => {
  return (
    <div className="paginationSettings">
      <Pagination
        onChange={(page, pageSize) => getCurrentPage(page, pageSize)}
        current={currentPage}
        total={totalPages}
        pageSize={20}
        showSizeChanger={false}
      />
    </div>
  );
};
export default PaginationType;
