import {PostProvider} from "../providers/PostProvider";
import React from "react";
import ListPosts from "./ListPosts";
import { Tab, Tabs } from "react-bootstrap";


export interface ProfilTabsProps {}

const ProfilTabs: React.FC<ProfilTabsProps> = () => {
    return (
        <Tabs defaultActiveKey='myOwnPost' id='profil-tabs' className="profil-tabs" justify>
            <Tab eventKey='myOwnPost' title='Mes publications' className="profil-tabs__item">
                <PostProvider>
                    <ListPosts whichposts={"myPosts"}/>
                </PostProvider>
            </Tab>
            <Tab eventKey='myOwnPostLiked' title='Mes likes'>
                <PostProvider>
                    <ListPosts whichposts={"likedPosts"}/>
                </PostProvider>
            </Tab>
        </Tabs>
    );
}

export default ProfilTabs;