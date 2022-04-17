import { EditFilled, SaveFilled } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import Input from 'antd/lib/input/Input';
import Title from 'antd/lib/typography/Title';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { changeTitleStart } from '../../../redux/account/account.actions';
import './AccountTitle.css';


const AccountTitle = ({ title, changeTitle }) => {
    const [isEditable, setisEditable] = useState(false);
    const [newTitle, setNewTitle] = useState(title);

    useEffect(() => {
        setisEditable(false);
    }, [title])

    const handleTitleInputChange = (event) => {
        setNewTitle(event.target.value);
    }

    const updateTitle = () => {
        if (newTitle && newTitle !== title) {
            changeTitle(newTitle);
        }
        else if (newTitle === title)
            setisEditable(false);
    }

    return (
        <>
            <Title style={{ padding: "8px 15px", margin: 0 }} level={3}>Title </Title>
            <div className='account-title'>

                {
                    isEditable ?
                        <>
                            <Tooltip title="Save">
                                <Button className='edit-btn' onClick={updateTitle} style={{ background: "#011529", borderColor:"#011529"}} type="primary" shape="circle" icon={<SaveFilled />} />
                            </Tooltip>
                            <Input className='input-title' style={{ fontSize: "30px", fontWeight: "bold" }} value={newTitle} onChange={handleTitleInputChange} />
                        </> :
                        <>
                            <Tooltip title="Edit">
                                <Button className='edit-btn' style={{ background: "#011529", borderColor:"#011529"}} onClick={() => setisEditable(val => !val)} type="primary" shape="circle" icon={<EditFilled />} />
                            </Tooltip>
                            <Title className='input-title' style={{ padding: "8px 15px", margin: 0, fontWeight: "normal" }} level={2}>{title}</Title>
                        </>

                }
            </div>
        </>
    )
}

const mapDispatchToProps = dispatch => ({
    changeTitle: (newTitle) => dispatch(changeTitleStart(newTitle)),
});

export default connect(null, mapDispatchToProps)(AccountTitle)