import Title from 'antd/lib/typography/Title';
import React, { useEffect, useState } from 'react';
import { Button, Input, Tooltip, Typography } from 'antd';
import { connect } from 'react-redux';
import { changeDescriptionStart } from '../../../redux/account/account.actions';
import "./AccountDescription.css";
import { EditFilled, SaveFilled } from '@ant-design/icons';

const { Text } = Typography;
const { TextArea } = Input;


const AccountDescription = ({ description, changeDescription }) => {
    const [isEditable, setisEditable] = useState(false);

    const [newDescription, setNewDescription] = useState(description);

    useEffect(() => {
        setisEditable(false);
    }, [description])

    const handleDescriptionInputChange = (event) => {
        setNewDescription(event.target.value);
    }

    const updateDescription = () => {
        if (newDescription && newDescription !== description) {
            changeDescription(newDescription);
        }
        else if (newDescription === description)
            setisEditable(false);
    }

    return (
        <>
            <Title style={{ padding: "25px 15px", margin: 0 }} level={3}>Description</Title>
            <div className='account-description'>
                {

                    isEditable ?
                        <>
                            <Tooltip title="Save">
                                <Button style={{ background: "#011529", borderColor:"#011529"}} onClick={updateDescription} type="primary" shape="circle" icon={<SaveFilled />} />
                            </Tooltip>
                            <TextArea
                                autoSize={{ minRows: 1, maxRows: 6 }}
                                style={{ fontSize: "22px", marginLeft: "10px"  }}
                                rows={1}
                                onChange={handleDescriptionInputChange}
                                value={newDescription} />
                        </> :
                        <>
                            <Tooltip title="Edit">
                                <Button style={{ background: "#011529", borderColor:"#011529"}} onClick={() => setisEditable(true)} type="primary" shape="circle" icon={<EditFilled />} />
                            </Tooltip>

                            <Text style={{ fontSize: "22px", marginLeft: "10px" }}>
                                {newDescription}
                            </Text>
                        </>
                }
            </div>
        </>
    )
}

const mapDispatchToProps = dispatch => ({
    changeDescription: (newDescription) => dispatch(changeDescriptionStart(newDescription)),
});

export default connect(null, mapDispatchToProps)(AccountDescription)