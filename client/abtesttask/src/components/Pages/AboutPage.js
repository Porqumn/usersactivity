import React from 'react';
import {Container, Stack} from "react-bootstrap";

const AboutPage = () => {
    return (
        <div>
            <Container className="mt-3">
                <Stack gap={3}>
                    <h1>Hi, ABTestReal!</h1>
                    <div>
                        This introductory task was completed by Ivan Umnov
                    </div>
                </Stack>
            </Container>
        </div>
    );
};

export default AboutPage;