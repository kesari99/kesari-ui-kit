import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {Switch } from "wouter";
import ProtectedRoute from "./lib/protected-route";
import Dashboard from "./page/Dashboard";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <ProtectedRoute path="/" component={Dashboard} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
