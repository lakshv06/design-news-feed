import { ReactElement } from "react";

function NavHeader (): ReactElement{
    return(
        <div className="d-flex justify-content-start">
            <ul className="nav nav-tabs">
  <li className="nav-item">
    <a className="nav-link active" aria-current="page" href="/home-page">Home</a>
  </li>
  <li className="nav-item">
    <a className="nav-link" href="/create-post">Create Post</a>
  </li>
  <li className="nav-item">
    <a className="nav-link" href="#">Social Media</a>
  </li>
</ul>
        </div>
    );
}

export default NavHeader;