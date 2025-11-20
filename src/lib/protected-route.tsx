import React from "react";
import { Route } from "wouter";

export default function ProtectedRoute({
  path,
  component,
}: {
  path: string;
  component: () => React.JSX.Element;
}) {
  return <Route path={path} component={component} />;
}
