import {
  Collapse,
  List,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
const GroupUsers = ({ members, open, setOpen }) => {
  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List size="small" component="div" disablePadding>
        {members.map((member) => {
          return (
            <ListItemButton key={member._id} sx={{ pl: 3 }}>
              <ListItemAvatar>
                <Avatar
                  alt={member.firstName}
                  src={`${process.env.REACT_APP_BASE_URL}${member.avatarSrc}`}
                />
              </ListItemAvatar>
              <ListItemText
                primary={`${member.firstName} ${member.lastName}`}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Collapse>
  );
};

export default GroupUsers;
