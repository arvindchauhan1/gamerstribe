import React, { useEffect, useState } from 'react';
import { List, ListItemButton, ListItemText, Button, Stack, IconButton, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import DomainIcon from '@mui/icons-material/Domain';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DeleteIcon from '@mui/icons-material/Delete';
import { updateUser } from '../api/users';
import { isLoggedIn } from '../helpers/authHelper';
import { Delete, DeleteForever } from '@mui/icons-material';

const LinkBrowser = ({ profileUser, fetchUser }) => {
    const [links, setLinks] = useState(profileUser.links || [])
    const [openDialog, setOpenDialog] = useState({ value: false, message: "" });
    const [linkToAdd, setLinkToAdd] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState({ value: false, message: "" }); // State for Snackbar

    const [linkToDelete, setLinkToDelete] = useState('');


    // Get the current user
    const currentUser = isLoggedIn();


    useEffect(() => {
        setLinks(profileUser.links || []);
    }, [profileUser]);


    const handleCopyLink = (link) => {
        console.log("Link copied:", link);
    };

    const getDomainIcon = (link) => {
        const domain = link;
        if (domain.includes("github.com")) {
            return <GitHubIcon />;
        } else if (domain.includes("instagram.com")) {
            return <InstagramIcon />;
        } else if (domain.includes("linkedin.com")) {
            return <LinkedInIcon />;
        } else {
            return <DomainIcon />;
        }
    };

    const handleAddLink = () => {

        const urlRegex = /^(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?$/;
        if (!linkToAdd || !urlRegex.test(linkToAdd)) {
            setOpenSnackbar({ value: true, message: "Enter valid URL" });
            return;
        }

        // If linkToAdd is a valid URL, open the dialog
        setOpenDialog({ value: true, message: "add" });
    };

    const handleConfirmAddLink = async () => {
        try {
            // Remove protocol from link
            const linkWithoutProtocol = linkToAdd.replace(/(^\w+:|^)\/\//, '');
            console.log("Link added:", linkWithoutProtocol);
            setLinkToAdd('');
            setOpenDialog({ value: false, message: "" });

            // Update currentUser in the database
            const res = await updateUser(currentUser, { links: [...profileUser.links, linkWithoutProtocol] });
            console.log(res);
            fetchUser();
            // Show Snackbar with message
            setOpenSnackbar({ value: true, message: 'Link added successfully' });
        } catch (error) {
            console.log(error);
        }
    };



    const handleDeleteLink = (link) => {
        console.log("Link to delete:", link);
        setLinkToDelete(link);
        setOpenDialog({ value: true, message: "delete" });
    };

    const confirmDeleteLink = async () => {
        try {
            // Update currentUser in the database to delete the link
            setOpenDialog({ value: false, message: "" });
            const res = await updateUser(currentUser, { links: profileUser.links.filter(l => l !== linkToDelete) });
            console.log(res);
            fetchUser();
            // Show Snackbar with message
            setOpenSnackbar({ value: true, message: 'Link deleted successfully' });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <Stack direction="row" alignItems="center" mb={2}>

                <Snackbar
                    color="success"
                    size="md"
                    variant="soft"
                    open={openSnackbar.value}
                    autoHideDuration={6000}
                    onClose={() => setOpenSnackbar({ value: false, message: "" })} // Close Snackbar when duration expires
                    message={openSnackbar.message}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                />
                <TextField
                    value={linkToAdd}
                    onChange={(e) => setLinkToAdd(e.target.value)}
                    label="Add Link"
                    variant="outlined"
                    fullWidth
                    sx={{ width: 'calc(100% - 5px)', marginRight: 2 }} // Customize width and margin
                />
                <Button variant="contained" onClick={handleAddLink}>Add</Button>
            </Stack>
            <List>
                {links.map((link, index) => (

                    <ListItemButton key={index} component="div" fullWidth>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%">
                            <Stack direction="row" spacing={2} alignItems="center">
                                {getDomainIcon(link)}
                                <ListItemText primary={link} />
                            </Stack>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <IconButton size="small" onClick={() => handleCopyLink(link)}>
                                    <FileCopyOutlinedIcon />
                                </IconButton>
                                <IconButton
                                    size="small"
                                    onClick={() => window.open(`http://${link}`, '_blank')} // Prepend 'http://' to the link
                                >
                                    <LaunchIcon />
                                </IconButton>
                                {currentUser && currentUser.userId === profileUser._id && (
                                    <IconButton
                                        size="small"
                                        onClick={() => handleDeleteLink(link)}
                                    >
                                        <DeleteForever />
                                    </IconButton>)}
                            </Stack>
                        </Stack>
                    </ListItemButton>

                ))}
            </List>
            <Dialog open={openDialog.value} onClose={() => setOpenDialog({ value: false, message: '' })}>
                <DialogTitle>Confirm</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {`Are you sure you want to ${openDialog.message} this link: ${openDialog.message === 'add' ? linkToAdd : linkToDelete}`}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog({ value: false, message: "" })}>No</Button>
                    <Button onClick={() => {
                        if (openDialog.message === 'add') {
                            handleConfirmAddLink();
                        } else if (openDialog.message === 'delete') {
                            confirmDeleteLink();
                        }
                    }}>Yes</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default LinkBrowser;
