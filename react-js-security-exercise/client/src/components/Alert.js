// @flow

import React from "react";

type Props = {
  type?: "info" | "warning" | "danger",
  children: React.Node | React.Node[],
};

const Alert = ({ type = "info", children }: Props) => (
  <div className={`alert alert-${type}`}>{children}</div>
);

export { Alert };
