import React from "react";
import { BrowserRouter , Route,Switch} from "react-router-dom";
import PostList from "../../components/post/PostList"
import PostView from "../../components/post/PostView"
import PostWrite from "../../components/post/PostWrite"
import PostUpdate from "../../components/post/PostUpdate"

function PostPage({match}) {
    return ( <> 
    <BrowserRouter>
    <Switch>
        <Route exact path={`${match.url}`} component={PostList} />
        <Route exact path={`${match.url}/write`} component={PostWrite} />
        <Route exact path={`${match.url}/:id`} component={PostView} />
        <Route exact path={`${match.url}/:id/update`} component={PostUpdate}/>
        </Switch>
        </BrowserRouter>
        </>
    );
}

export default PostPage;