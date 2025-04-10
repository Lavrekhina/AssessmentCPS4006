// import { Link } from "react-router";
import * as styles from "./styles";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/joy/Link";
import List from "@mui/joy/List";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";
import ListDivider from "@mui/joy/ListDivider";
import ListItem from "@mui/joy/ListItem";
import logoIMG from "./images/logo.jpg";
import IconButton from "@mui/joy/IconButton";
import MoreVert from "@mui/icons-material/MoreVert";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../contexts/user";

const links = [
  ["/", "Home"],
  ["/news", "News"],
  ["/profile", "Profile"],
  ["/symptoms-checker", "Symptoms"],
  ["/nutritional", "Nutrition"],
  ["/mental-tools", "Mental Tools"],
  ["/health-conditions", "Health Conditions"],
];

const Links = ({ orientation }) => {
  return (
    <List role="menubar" orientation={orientation}>
      {links.map(([link, name]) => {
        return (
          <ListItem key={link}>
            <Link component={RouterLink} to={link}>
              {name}
            </Link>
          </ListItem>
        );
      })}
    </List>
  );
};

const Burger = () => {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "plain", color: "neutral" } }}
      >
        <MoreVert />
      </MenuButton>
      <Menu placement="bottom-end">
        {links.map(([link, name]) => {
          return (
            <MenuItem key={link}>
              <Link component={RouterLink} to={link}>
                {name}
              </Link>
            </MenuItem>
          );
        })}
      </Menu>
    </Dropdown>
  );
};

export const LayoutMain = ({ children }) => {
  const { userData } = useContext(UserContext);
  return (
    <styles.Container>
      <styles.Header>
        <styles.Wrap>
          <styles.HeaderWrap>
            <styles.HeaderLogo src={logoIMG} />
            <styles.HeaderLinks>
              <Links orientation={"horizontal"} />
            </styles.HeaderLinks>
            <styles.HeaderBurger>
              <Burger />
            </styles.HeaderBurger>
            {userData?.fullName && (
              <styles.ProfileContainer>
                <styles.ProfilePicture
                  src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                  alt="Profile"
                />
                <styles.UserName>{userData.fullName}</styles.UserName>
              </styles.ProfileContainer>
            )}
          </styles.HeaderWrap>
        </styles.Wrap>
      </styles.Header>
      <styles.Content>
        <styles.Wrap>{children}</styles.Wrap>
      </styles.Content>
    </styles.Container>
  );
};
