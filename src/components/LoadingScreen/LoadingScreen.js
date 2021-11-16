import React from 'react'
import styles from './LoadingScreen.module.css'
import {Spinner} from "react-bootstrap";

class LoadingScreen extends React.Component{

    constructor() {
        super();
        this.state = {
            isLoading: false
        }
    }

    loadingScreen(premise){
        this.setState({
            isLoading: true
        })

        premise.then(() => this.setState({
            isLoading: false
        }))
    }

    render() {
        return (
            <div className={styles.loader} hidden={!this.state.isLoading}>
                <Spinner animation="border" role="status" className={styles.spinner}>
                    <span className="visually-hidden ">Loading...</span>
                </Spinner>
            </div>
        );
    }
}

export default LoadingScreen