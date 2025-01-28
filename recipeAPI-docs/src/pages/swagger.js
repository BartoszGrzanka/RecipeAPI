import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerPage = () => {
  return (
    <div style={{ margin: '20px' }}>
      <SwaggerUI url="http://localhost:8989/api-docs/swagger.json" />
    </div>
  );
};

export default SwaggerPage