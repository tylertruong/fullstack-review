import React from 'react';

const RepoListEntry = (props) => (
  <div>
    <div> <a href={props.repo.url}> {props.repo.name} </a> </div>
    <div> {props.repo.author} </div>
    <div>  </div>
    <div> {props.repo.updatedAt} </div>
    <br></br>
  </div>
)

export default RepoListEntry;