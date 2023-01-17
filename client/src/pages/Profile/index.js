import { Button, Text } from "@chakra-ui/react";
import React from "react";
import { useAuth } from "../../context/AuthContext";

const Profile = ({ history }) => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    logout(() => {
      history.push("/");
    });
  };
  return (
    <div>
      <Text fontSize={30}>Profile</Text>
      <code>{JSON.stringify(user)}</code>
      <br />
      <br />
      <Button colorScheme="pink" variant="solid" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Profile;
