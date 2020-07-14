import React,{useState,useEffect} from "react";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";

import SearchIcon from "@material-ui/icons/Search";
import { searchBlog } from "../actions/blogs";
import Router from 'next/router';
const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginRight:'2rem',
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchInput() {
  const classes = useStyles();

  

  const [searchQuery,setSearchQuery]=useState();

  const searchSubmitHandler=(e)=>{
      e.preventDefault();
      /* 
      searchBlog({search}).then(data=>{
          setValues({...values,results:data,searched:true,message:`${data.length} blogs found.`});
          console.log('serch res:'+data)
      }); 
      */
     console.log('exected submit')
      Router.push({
        pathname: '/searchResults',
        query: { search: searchQuery },
      })
  }
  
  const searchChangeHandler=(e)=>{
     setSearchQuery(e.target.value);
     console.log('field strokes'+searchQuery)
  }
  return (
    <form onSubmit={searchSubmitHandler}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
            onChange={searchChangeHandler}
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
    </form>
  );
}
