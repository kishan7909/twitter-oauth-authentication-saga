import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery, useTheme } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getTwitterData } from '../actions/twitter'
import { getDataList, getTwitterInit_API, setCallbackURLDataAPI } from '../apis/auth'
import { useSelector } from 'react-redux'
import DataTables from '../components/DataTables'
import CustomButton from '../components/CustomButton'
import { navigate } from '@reach/router'

var popWindow

const Home = () => {
    const dispatch = useDispatch()
    const loading = useSelector((state) => state.auth.loading)
    const tableColumns = useSelector((state) => state.auth.tableColumns)
    const tableData = useSelector((state) => state.auth.tableData)
    const [openTwitterDialog, setOpenTwitterDialog] = useState(false)
    const [isSetURL, setIsSetURL] = useState(true)
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


    const handleClickOpen = () => {
        setOpenTwitterDialog(true);
    };

    const handleClose = () => {
        setOpenTwitterDialog(false);
    };

    const handleLoadData = () => {
        dispatch(getTwitterData())
        if (window.opener != null && !window.opener.closed) {
            window.opener.focus()
            window.opener.location.href = "/list"
            window.opener.location.reload()
            window.opener.location.reload()
            window.close()
        }
    }

    useEffect(() => {
        handleLoadData(true)
        dispatch(getTwitterData())
    }, [])

    if (window.location.search) {
        let searchParams = window.location.search
        let checkparams = new URLSearchParams(window.location.search)
        let oauth_token = null
        let oauth_verifier = null
        oauth_token = checkparams.get("oauth_token").toString()
        oauth_verifier = checkparams.get("oauth_verifier").toString()
        if (oauth_token && oauth_verifier) {
            setCallbackURLDataAPI(searchParams)
        }
        oauth_token = null
        oauth_verifier = null
        if (isSetURL) {
            var loadButton = window.opener.document.getElementById("loadmoreButton");
            loadButton.click()
            setIsSetURL(false)
        }
    }

    if (tableData.length > 0) {
        navigate("/list")
    }

    return (
        <>
            <Container fluid="true" style={{ marginTop: "20px" }}>
                <CustomButton handleClickOpen={handleClickOpen} handleLoadData={handleLoadData} />
                <Dialog
                    fullWidth="sm"
                    fullScreen={fullScreen}
                    open={openTwitterDialog}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">Sign In With Twitter</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Table List
                        </DialogContentText>
                        <div className="button-container">
                            <Button variant="contained" size="small" color="primary" onClick={() => { handleClose(); dispatch(getTwitterData(true)) }}>
                                Twitter
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>

            </Container>
        </>
    )
}

export default Home