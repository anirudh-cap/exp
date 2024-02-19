import React from "react";
import { CapHeading, CapRow, CapIcon } from "@capillarytech/cap-ui-library";
import withStyles from '../../../utils/withStyles';
import styles from './styles';

const ProfilePageHeader = ({className}) => {
    return (
        <>
        <CapRow className="main">
        <CapRow className="imageIcon">
            <CapIcon type="user" withBackground={true} size="l" />
        </CapRow>
         <CapRow className='main'>
            <CapRow>
                <CapHeading type="h3" >Name: Lorem Ipsum </CapHeading>
            </CapRow>
            <CapRow>
                <CapHeading type="h3" >Email: user@test.com</CapHeading>
            </CapRow>
        </CapRow>
        </CapRow>
        </>
    );
}

export default withStyles(ProfilePageHeader, styles);