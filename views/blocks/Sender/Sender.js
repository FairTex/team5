import React from 'react';
import states from './states';

export default function Sender(Component) {
    return class Sender extends React.Component {
        constructor(props) {
            super(props);

            this.state = states.defaultState;

            this.handleSuccessfulSend = this.handleSuccessfulSend.bind(this);
            this.handleFailedSend = this.handleFailedSend.bind(this);
            this.handleAction = this.handleAction.bind(this);
        }

        handleAction() {
            this.setState(states.actionState);

            if (this.props.onActon) {
                this.props.onActon();
            }

            this.props.handleAction(
                {
                    handleSuccessfulSend: this.handleSuccessfulSend,
                    handleFailedSend: this.handleFailedSend
                },
                this.props.data
            );
        }

        handleSuccessfulSend(data) {
            this.setState(states.defaultState);
            if (this.props.onSuccesfulEnd) {
                this.props.onSuccesfulEnd(data);
            }
        }

        handleFailedSend(error) {
            this.setState(states.defaultState);
            if (this.props.onFailedSend) {
                this.props.onFailedSend(error.isNoConection);
            }
        }

        render() {
            return (
                <Component {...this.state} {...this.props}
                    onAction={this.handleAction}
                />
            );
        }
    };
}
