import React from "react";
import PermissionWrapper from "../../../../providers/PermissionsProvider";
import PageProvider from "../../../../providers/PageProvider";
import { PERMISSIONS } from "../../../../common";

export default () => {
  return (
    <PermissionWrapper permission={PERMISSIONS["User Management"]} view message>
      <PageProvider>
        <h1>hello world</h1>
      </PageProvider>
    </PermissionWrapper>
  );
};
