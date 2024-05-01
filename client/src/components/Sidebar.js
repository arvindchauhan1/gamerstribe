import { Stack, Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { getPosts } from "../api/posts";
import { isLoggedIn } from "../helpers/authHelper";
import FindUsers from "./FindUsers";
import Loading from "./Loading";
import PostCard from "./PostCard";
import TopPosts from "./TopPosts";
import SendIcon from '@mui/icons-material/Send';
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Stack spacing={2}>
      <FindUsers />
      <Button
        component={Link}
        to="/messenger"
        variant="contained"
        color="secondary"
        endIcon={<SendIcon />}
      >
        messenger
      </Button>
    </Stack>
  );
};

export default Sidebar;
