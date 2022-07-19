// import React from 'react';
// import {
//     Card,
//     CardBody
// } from 'reactstrap';

// import img1 from '../../assets/images/logo-icon.png';

// const TableCampaign = () => {
//     return <div>
//         <Card>
//             <CardBody>
//                 <div className="error-body text-center">
//                     <img src={img1} alt="" />
//                     <h4 className="text-dark font-24">SmartPoke Admin</h4>
//                     <div className="mt-4">
//                         <h3>Your page in under maintenance</h3>
//                         <h5 className="mb-0 text-muted font-medium">Something wrong going on this page.</h5>
//                         <h5 className="text-muted font-medium">Please Check back again.</h5>
//                     </div>
//                     <div className="mt-4 mb-4"><i className="ti-settings font-24"></i></div>
//                 </div>
//             </CardBody>
//         </Card>
//     </div>;
// }

// export default TableCampaign;

import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import campaignService from "../../_spservices/_spmarketing/campaignsEditor.service";
import moment from "moment";

import campaignCodes from "../../_spdata/_spcampaign/campaignType";
import mediaCodes from "../../_spdata/_spcampaign/mediaType";

import {
  Card,
  CardBody,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  CustomInput,
  Label,
  Input,
  Alert,
  Col,
  Row,
} from "reactstrap";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "react-table/react-table.css";

function TableCampaign() {
  const [data, setData] = useState([]);
  const [campaignList, setCampaignList] = useState([]);
  const [selectedMediaType, setSelectedMediaType] = useState(true);
  const [deferredOpt, setDeferredOpt] = useState(false);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [contentMessage, setContentMessage] = useState('');
  const [noSentMsg, setNoSentMsg] = useState(false);

  const uploadImageCallBack = (file) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "https://api.imgur.com/3/image");
      xhr.setRequestHeader("Authorization", "Client-ID XXXXX");
      const data = new FormData();
      data.append("image", file);
      xhr.send(data);
      xhr.addEventListener("load", () => {
        const response = JSON.parse(xhr.responseText);
        resolve(response);
      });
      xhr.addEventListener("error", () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    });
  };

  const [alertMsg, setAlertMsg] = useState({});

  // For Dismiss Button with Alert
  const [visible, setVisible] = useState(true);
  const onDismiss = () => {
    setVisible(false);
  };

  // For Open/Close Modal Create - Update
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };

  // For Open/Close Modal Delete
  const [modalDelete, setModalDelete] = useState(false);
  const toggleDelete = () => {
    setModalDelete(!modalDelete);
  };

  useEffect(() => {
    setVisible(false);
    getCampaignList();
  }, []);

  const handleChangeDeferred = (event) => {
    setDeferredOpt(event.target.checked ? true : false);
  };

  const setContent = (content) => {
    setContentMessage(JSON.stringify(('content state', convertToRaw(content))));
  }

  const onEditorStateChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    setEditorState(editorState);
    setContent(contentState);
};

  const getCampaignList = () => {
    campaignService
      .getAll()
      .then((response) => {
        setCampaignList(response.data.data);
      })
      .catch((error) => {
        setAlertMsg({
        color: "danger", 
        text: "text-danger", 
        icon: "fas fa-ban", 
        msg: "An error occured while trying to request campaigns, ("+error.response.statusText+")."});
        setVisible(true);
      });
  };

  const getErrorMessage = (err) => {
    alertMsg.color = "danger";
    alertMsg.text = "text-danger";
    alertMsg.icon = "fas fa-ban";
    switch (err) {
      case 403:
        alertMsg.msg = "Campaign already exist!";
        break;
      case 500:
        alertMsg.msg =
          "Something wrong happens with the camapign. Server Error!";
        break;
      default:
        alertMsg.msg =
          "An error occured while trying to request campaigns.";
        break;
    }
    setAlertMsg(alertMsg);
  };

  const createItem = (data) => {
    campaignService
      .create(data)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "Campaign saved successful!";
        setAlertMsg(alertMsg);
        getCampaignList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getCampaignList();
      });
  };

  const updateItem = (id, data) => {
    campaignService
      .update(id, data)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "Campaign updated successful!";
        setAlertMsg(alertMsg);
        getCampaignList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getCampaignList();
      });
  };

  const deleteItem = (id) => {
    campaignService
      .delete(id)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "Campaign deleted successful!";
        setAlertMsg(alertMsg);
        getCampaignList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getCampaignList();
      });
  };

  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    onEditorStateChange(editorState);
    let id = event.target.id.value;
    let name = event.target.name.value;
    let validDate = event.target.validDate.value;
    let mediaType = event.target.mediaType.value;
    let message = contentMessage;
    let deferred = event.target.deferred.checked;
    let deferredDate = "1900-01-01";
    if (deferred) { 
        deferredDate = new Date(event.target.deferredDate.value+' '+event.target.deferredTime.value);
    }
    let percent = 0;
    let valueIn = 0;
    let type = event.target.typeCode.value;
    let item = {
      "data": {
        "name": name,
        "validDate": validDate,
        "mediaType": mediaType,
        "message": message,
        "deferred": deferred,
        "deferredDate": deferredDate,
        "percent": percent,
        "valueIn": valueIn,
        "type": type,
      }
    };
    if (!id) {
      createItem(item);
    } else {
      updateItem(id, item);
    }
    setVisible(true);
    setModal(!modal);
  };

  const handleSubmitDelete = (event) => {
    event.preventDefault();
    let id = event.target.id.value;
    deleteItem(id);
    setVisible(true);
    setModalDelete(!modalDelete);
  };

  const Campaigns = campaignList.map((campaign) => {
    return {
      id: campaign.id,
      name: campaign.attributes.name,
      validDate: campaign.attributes.validDate,
      mediaType: campaign.attributes.mediaType,
      mediaName: mediaCodes.find((m) => m.id === campaign.attributes.mediaType),
      message: campaign.attributes.message,
      deferred: campaign.attributes.deferred ? "Checked" : "",
      switchDeferred: (
        <div className="text-center">
          <CustomInput
            type="switch"
            id="deferredSwitch"
            name="deferredSwitch"
            checked={campaign.attributes.deferred}
            disabled
          />
        </div>
      ),
      defDate: campaign.attributes.deferred ? (moment(campaign.attributes.deferredDate)).format("yyyy/MM/DD hh:mm") : "",
      deferredDate: campaign.attributes.deferred ? campaign.attributes.deferredDate : "",
      percent: campaign.attributes.percent,
      type: campaign.attributes.type,
      typeName: campaignCodes.find((t) => t.id === campaign.attributes.type),
      messages: campaign.attributes.messages.data,
      actions: (
        // we've added some custom button actions
        <div className="text-center">
          {/* use this button to add a edit kind of action */}
          <Button
            onClick={() => {
              let item = Campaigns.find((o) => o.id === campaign.id);
              setSelectedMediaType(item.mediaType)
              let rawContent = convertFromRaw(JSON.parse(item.message));
              setEditorState(EditorState.createWithContent(rawContent));
              setDeferredOpt(item.deferred);
              setModal(!modal);
              setData(item);
            }}
            color="inverse"
            size="sm"
            round="true"
            icon="true"
          >
            <i className="fa fa-edit" />
          </Button>
          {/* use this button to remove the data row */}
          <Button
            onClick={() => {
              let item = Campaigns.find((o) => o.id === campaign.id);
              setModalDelete(!modalDelete);
              setNoSentMsg(false);
              if (item.messages.length > 0) {
                setNoSentMsg(true);
              }
              setData(item);
            }}
            className="ml-1"
            color="inverse"
            size="sm"
            round="true"
            icon="true"
          >
            <i className="fa fa-trash-alt" />
          </Button>
        </div>
      ),
    };
  });

  return (
    <React.Fragment>
      {/*--------------------------------------------------------------------------------*/}
      {/* Modal to Create/Update Item*/}
      {/*--------------------------------------------------------------------------------*/}
      <Modal isOpen={modal} toggle={toggle.bind(null)} size="lg">
        <ModalHeader toggle={toggle.bind(null)}> <span>{selectedMediaType} - </span> Campaign</ModalHeader>
        <ModalBody>
          <Form onSubmit={(event) => handleSubmit(event)}>
            <Input type="hidden" name="id" id="id" defaultValue={data.id} />
            <Row form>
              <Col sm={12} md={8}>
                <FormGroup>
                  <Label for="name">Name *</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    required={true}
                    defaultValue={data.name}
                  />
                </FormGroup>
              </Col>
              <Col sm={12} md={4}>
                <FormGroup>
                  <Label for="validDate">Valid Date *</Label>
                  <Input
                    type="date"
                    name="validDate"
                    id="validDate"
                    required={true}
                    defaultValue={data.validDate}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col sm={12} md={4}>
                <FormGroup align="center">
                  <Label for="selectMediaType">Media *</Label>
                  <Input
                    type="select"
                    id="mediaType"
                    name="mediaType"
                    required={true}
                    defaultValue={data.mediaType}
                    onChange={(e) => setSelectedMediaType(e.target.value)}
                  >
                    <option value=""> -- Select Media -- </option>
                    {mediaCodes.map((media) => {
                      return (
                        <option key={media.id} value={media.code}>
                          {media.name}
                        </option>
                      );
                    })}
                  </Input>
                </FormGroup>
              </Col>
              <Col sm={12} md={4}>
                <FormGroup>
                  <Label for="selectTypeCode">Type *</Label>
                  <Input
                    type="select"
                    name="typeCode"
                    id="typeCode"
                    required={true}
                    defaultValue={data.type}
                  >
                    <option value=""> -- Select Type -- </option>
                    {campaignCodes.map((type) => {
                      return (
                        <option key={type.id} value={type.code}>
                          {type.name}
                        </option>
                      );
                    })}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row form></Row>
            <Row form>
              <Col sm={12} md={2}>
                <FormGroup align="center">
                  <Label for="deferred">Deferred *</Label>
                  <CustomInput
                    type="switch"
                    id="deferred"
                    name="deferred"
                    className="custom-switch"
                    defaultChecked={data.deferred}
                    onChange={handleChangeDeferred}
                  />
                </FormGroup>
              </Col>
              <Col sm={12} md={3}>
                <FormGroup>
                  <Label for="deferredDate">Date *</Label>
                  <Input
                    type="date"
                    name="deferredDate"
                    id="deferredDate"
                    required={true}
                    defaultValue={formatDate((new Date(data.deferredDate)).toDateString())}
                    disabled={!deferredOpt}
                  />
                </FormGroup>
              </Col>
              <Col sm={12} md={2}>
                <FormGroup>
                  <Label for="deferredTime">Time</Label>
                  <Input
                    type="time"
                    name="deferredTime"
                    id="deferredTime"
                    required={true}
                    defaultValue={(new Date(data.deferredDate)).toLocaleTimeString()}
                    disabled={!deferredOpt}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col sm={12} md={12}>
                <FormGroup>
                  <div className="editor">
                    <Label for="editor">Message *</Label>
                    <div className="editor">
                      <Editor
                        editorState={editorState}
                        onEditorStateChange={onEditorStateChange}
                        editorStyle={{border:"1px solid #f4f4f4", height:"250px"}}
                        toolbar={{
                          inline: { inDropdown: true },
                          list: { inDropdown: true },
                          textAlign: { inDropdown: true },
                          link: { inDropdown: true },
                          history: { inDropdown: true },
                          image: {
                            uploadCallback: uploadImageCallBack,
                            alt: { present: true, mandatory: true },
                          },                                                
                        }}
                      />
                    </div>
                  </div>
                  {/* <div>{JSON.stringify(convertToRaw(editorState.getCurrentContent()))}</div> */}
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Button color="success" type="submit">
                Save
              </Button>
              <Button
                color="secondary"
                className="ml-1"
                onClick={toggle.bind(null)}
              >
                Cancel
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>

      {/*--------------------------------------------------------------------------------*/}
      {/* Modal to Delete Item*/}
      {/*--------------------------------------------------------------------------------*/}
      <Modal isOpen={modalDelete} toggle={toggleDelete.bind(null)}>
        <ModalHeader toggle={toggleDelete.bind(null)}> Campaign </ModalHeader>
        <ModalBody>
          <Form onSubmit={(event) => handleSubmitDelete(event)}>
            <Input type="hidden" name="id" id="id" defaultValue={data.id} />
            {!noSentMsg ? (
              <div>
                Do you want to delete this campaign? <b>{data.name}</b>
              </div>
            ) : (
              <div>
                You can not delete the campaign <b>{data.name}</b>, it has
                messages sent.
              </div>
            )}
            <br />
            <FormGroup>
              <Button color="success" type="submit" disabled={noSentMsg}>
                Delete
              </Button>
              <Button
                color="secondary"
                className="ml-1"
                onClick={toggleDelete.bind(null)}
              >
                Cancel
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>

      {/*--------------------------------------------------------------------------------*/}
      {/* Start Action table*/}
      {/*--------------------------------------------------------------------------------*/}
      <Card>
        {visible ? (
          <Alert
            color={alertMsg.color}
            isOpen={visible}
            toggle={onDismiss.bind(null)}
          >
            <div className="d-flex">
              <div className="stats">
                <h4 className={`mt-0 ${alertMsg.text}`}>{alertMsg.msg}</h4>
              </div>
              <div className="stats-icon text-left ml-auto">
                <i className={`${alertMsg.icon} display-7 op-3 text-dark`}></i>
              </div>
            </div>
          </Alert>
        ) : (
          ""
        )}
        <CardTitle className="mb-0 p-3 border-bottom bg-light">
          <i className="mdi mdi-message display-7 mr-2"></i>List of Campaigns
        </CardTitle>
        <CardBody>
          <Button
            onClick={() => {
              let item = {
                id: "",
                name: "",
                validDate: Date.now(),
                mediaType: "SMS",
                message: " ",
                deferred: false,
                deferredDate: new Date("1900/01/01"),
                percent: 0,
                valueIn: 0,
                type: "",
              };
              setEditorState(EditorState.createEmpty());
              setSelectedMediaType(item.mediaType)
              setDeferredOpt(item.deferred);
              setModal(!modal);
              setData(item);
            }}
            className="btn"
            outline
            color="secondary"
            type="submit"
          >
            New Campaign
          </Button>
          <br />
          <br />
          <ReactTable
            columns={[
              {
                Header: "Name",
                accessor: "name",
              },
              {
                Header: "Valid Date",
                accessor: "validDate",
                width: 100,                
              },
              {
                Header: "Media",
                accessor: "mediaType",
                width: 120,                
              },
              {
                Header: "Type",
                accessor: "type",
                width: 120,                
              },
              {
                Header: "% Eff.",
                accessor: "percent",
                width: 60,                
              },
              {
                Header: "Def.",
                accessor: "switchDeferred",
                width: 60,                
              },
              {
                Header: "Def. Date",
                accessor: "defDate",
                width: 140,                
              },
              {
                Header: "Def. Date",
                accessor: "deferredDate",
                show:false,
              },
              {
                Header: "Actions",
                accessor: "actions",
                sortable: false,
                filterable: false,
                width: 100,                
              },
            ]}
            defaultPageSize={10}
            showPaginationBottom={true}
            className="-striped -highlight"
            data={Campaigns}
            filterable
          />
        </CardBody>
      </Card>
      {/*--------------------------------------------------------------------------------*/}
      {/* End Action table*/}
      {/*--------------------------------------------------------------------------------*/}
    </React.Fragment>
  );
}

export default TableCampaign;
