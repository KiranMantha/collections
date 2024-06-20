import React from "react";

import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../components/Loading";

export const ProfileComponent = () => {
  const { user } = useAuth0();

  return (
    <>
      <img
        src={user.picture}
        alt="Profile"
        className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
      />
      <h2>{user.name}</h2>
      <p className="lead text-muted">{user.email}</p>
      {/* <Highlight>{JSON.stringify(user, null, 2)}</Highlight> */}
    </>
  );
};

export default withAuthenticationRequired(ProfileComponent, {
  onRedirecting: () => <Loading />,
});
