import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import SidebarChannel from './SidebarChannel';
import { Call, Headset, InfoOutlined, Mic, Settings, SignalCellularAlt } from '@material-ui/icons';
import { Avatar } from '@material-ui/core';
import { selectUser } from './features/userSlice';
import { useSelector } from 'react-redux';
import db, { auth } from './firebase';
import logo from './assets/logo.png';

function Sidebar() {
    const user = useSelector(selectUser);
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        db.collection('channels').onSnapshot((snapshot) =>
            setChannels(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    channel: doc.data(),
                }))
            )
        );
    }, []);

    const handleAddChannel = () => {
        const channelName = prompt("Enter a new channel name");
        if (channelName) {
            db.collection('channels').add({
                channelName: channelName,
            });
        }
    };

    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <div className="sidebar__toplogo">
                    <Avatar src={logo} />
                    <h3>DiscordServer</h3>
                </div>
                <div className="sidebar__topicon">
                    <ExpandMoreIcon />
                </div>
            </div>

            <div className="sidebar__channels">

                <div className="sidebar__channelsHeader">
                    <div className="sidebar__header">
                        <ExpandMoreIcon />
                        <h4>Text channels</h4>
                    </div>
                    <AddIcon onClick={handleAddChannel} className="sidebar__addChannel" />
                </div>

                <div className="sidebar__channelsList">
                    {channels.map(({ id, channel }) => (
                        <SidebarChannel
                            key={id}
                            id={id}
                            channelName={channel.channelName}
                        />
                    ))}
                </div>

            </div>

            <div className="sidebar__voice">
                <SignalCellularAlt
                    className="sidebar__voiceIcon"
                    fontSize="large"
                />
                <div className="sidebar__voiceInfo">
                    <h3>Voice Connected</h3>
                    <p>Stream</p>
                </div>
                <div className="sidebar__voiceIcons">
                    <InfoOutlined />
                    <Call />
                </div>
            </div>

            <div className="sidebar__profile">
                <Avatar onClick={() => auth.signOut()} src={user.photo} />
                <div className="sidebar__profileInfo">
                    <h3>{user.displayName}</h3>
                    <p>#{user.uid.substring(0, 5)}</p>
                </div>
                <div className="sidebar__profileIcons">
                    <Mic />
                    <Headset />
                    <Settings />
                </div>

            </div>
        </div>
    )
}

export default Sidebar;
