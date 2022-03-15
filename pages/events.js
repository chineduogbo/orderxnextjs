import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Table, Tag, Space, Modal, Button, Form, Input, Alert } from 'antd';
import Dashboard from '../components/dashboard';
import { Formik } from 'formik';

import Link from 'next/link';
const axios = require('axios');


const { Column, ColumnGroup } = Table;

const data = [
    {
        key: '1',
        firstName: 'John',
        lastName: 'Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        firstName: 'Jim',
        lastName: 'Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        firstName: 'Joe',
        lastName: 'Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];
const Event = (props) => {
    console.log(props)

    const [visible, setVisible] = useState(false);
    return (
        <>
            <div class="">
                <Dashboard title="Events">
                    <Button type="primary" onClick={() => setVisible(true)}>
                        Add Event
                    </Button>
                    <div className='table-responsive'>
                        <Table dataSource={props.events}>

                            <Column title="Event Name" dataIndex="eventname" key="eventname" />
                            <Column title="Event Address" dataIndex="eventaddress" key="eventaddress" />

                            <Column title="Created By" dataIndex="username" key="username" />
                            <Column title="Created On" dataIndex="DateCreated" key="DateCreated" />

                            <Column
                                title="Action"
                                key="action"
                                render={(text, record) => (
                                    <Space size="middle">
                                        <a>Invite {record.lastName}</a>
                                        <a>Delete</a>
                                        <Button type="primary" onClick={() => setVisible(true)}>
                                            Open Modal of 1000px width
                                        </Button>
                                    </Space>
                                )}
                            />
                        </Table>
                    </div>
                </Dashboard>
                <Modal
                    title="Create Events"
                    centered
                    visible={visible}
                    onOk={() => setVisible(false)}
                    onCancel={() => setVisible(false)}
                    width={1000}
                    footer={null}
                >
                    <Formik
                        initialValues={{
                            eventaddress: '',
                            eventname: '',

                        }}
                        validate={values => {
                            const errors = {};

                        }}
                        onSubmit={async (values, { setSubmitting }) => {


                            const body = {
                                eventaddress: values.eventaddress,
                                eventname: values.eventname,


                            };
                            const response = await fetch('/api/events', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(body),
                            });
                            //console.log(response);
                            const data = await response.json();

                            console.log(await data);
                            if (data.success) {
                                setIsModalVisible(false);
                                //  localStorage.setItem("UserDetails", JSON.stringify(data));
                                <Alerts />
                            }


                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            /* and other goodies */
                        }) => (



                            <div >
                                <div className="row ">
                                    <div className=" col-12">
                                        <div id="auth-left">


                                            <form onSubmit={handleSubmit} layout="vertical"
                                                name="form_in_modal">

                                                <div className="form-group position-relative has-icon-left mb-4">
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-xl"
                                                        placeholder="Event Name"
                                                        value={values.eventname}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        name="eventname"
                                                        id="eventname"
                                                    />
                                                    <div className="form-control-icon">
                                                        <i className="bi bi-calendar-event" />
                                                    </div>
                                                </div>
                                                <div className="form-group position-relative has-icon-left mb-4">
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-xl"
                                                        placeholder="Event Address"
                                                        value={values.eventaddress}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        name="eventaddress"
                                                        id="eventaddress"
                                                    />
                                                    <div className="form-control-icon">
                                                        <i className="bi bi-geo-alt" />
                                                    </div>
                                                </div>



                                                <button className="btn btn-primary  btn-lg shadow-lg mt-5 " type="submit" >
                                                    Create Event
                                                </button>
                                            </form>

                                        </div>
                                    </div>

                                </div>
                            </div>

                        )}
                    </Formik>
                </Modal>
            </div>
        </>
    )
}

export default Event;

export async function getStaticProps() {
    // Get external data from the file system, API, DB, etc.

    var data = await fetch('http://localhost:3000/api/events/getall', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    var readdata = await data.json();
    //console.log(readdata);
    // const jdata = await data.json();
    // console.log(jdata)
    //var {returnobj} = await readdata;
    //var returnobj = JSON.parse(JSON.stringify(await readdata));
    // console.log(returnobj.data)
    // The value of the `props` key will be
    //  passed to the `Home` component
    // const projects = await data.json();
    //console.log(returnobj)

    var data = readdata;

    return {
        props: { events: data }
    }

}


export const Alerts = () => {
    return (
        <> <Alert
            message="Info Text"
            description="Event Created"
            type="info"
            action={
                <Space direction="vertical">
                    <Button size="small" type="primary">
                        Accept
                    </Button>

                </Space>
            }
            closable
        /></>
    )
}
