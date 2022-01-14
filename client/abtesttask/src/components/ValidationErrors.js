const ValidationErrors = ({errorMessages}) => {
    return (
        <div>
            {
                errorMessages !== undefined ?
                    <div>
                        {
                            errorMessages.map((errorMessage) => <div key={errorMessage}
                                                                     style={{color: 'red'}}>{errorMessage}</div>)
                        }
                    </div>
                    : <div></div>
            }
        </div>
    );
};

export default ValidationErrors;