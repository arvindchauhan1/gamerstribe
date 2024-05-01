import {
  Avatar,
  Card,
  Divider,
  IconButton,
  Stack,
  Typography,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { MdRefresh } from "react-icons/md";
import { Link } from "react-router-dom";
import { getRandomUsers } from "../api/users";
import Loading from "./Loading";
import UserAvatar from "./UserAvatar";
import HorizontalStack from "./util/HorizontalStack";
import UserEntry from "./UserEntry";

const FindUsers = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    const data = await getRandomUsers({ size: 20 });
    setLoading(false);
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleClick = () => {
    fetchUsers();
  };

  // Filter users based on search term
  const filteredUsers = users && users.filter(user => user.username.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Card>
      <Stack spacing={2}>
        <HorizontalStack justifyContent="space-between">
          <HorizontalStack>
            <AiOutlineUser />
            <Typography>Find Others</Typography>
          </HorizontalStack>
          <IconButton
            sx={{ padding: 0 }}
            disabled={loading}
            onClick={handleClick}
          >
            <MdRefresh />
          </IconButton>
        </HorizontalStack>

        <Divider />

        {/* Search input field */}
        <TextField
          label="Search by username"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {loading ? (
          <Loading />
        ) : (
          filteredUsers && filteredUsers.map((user) => (
            <UserEntry username={user.username} key={user.username} />
          ))
        )}
      </Stack>
    </Card>
  );
};

export default FindUsers;
