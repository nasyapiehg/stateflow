// Redirect to Dashboard — StateFlow uses AppLayout with dedicated page routes
import { Redirect } from "wouter";

export default function Home() {
  return <Redirect to="/" />;
}
