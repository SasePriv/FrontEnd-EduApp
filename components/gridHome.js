import React from 'react';
import { Col, Row, Grid } from "react-native-easy-grid";
import { StyleSheet, Text} from 'react-native'

export default function GridHome() {
    return (
        <Grid style={styles.griya}>
            <Row style={styles.filas}>
                <Col></Col>
                <Col></Col>
                <Col></Col>
            </Row>
            <Row style={styles.filas}>
                <Col></Col>
                <Col></Col>
                <Col></Col>
            </Row>
            <Row style={styles.filas}>
                <Col></Col>
                <Col></Col>
                <Col></Col>
            </Row>
        </Grid>
    )
}

const styles = StyleSheet.create({
    griya:{
        flex: 1
    },
    filas: {
        width: 100,
        height: 100,
        backgroundColor: 'green'        
    }
})

