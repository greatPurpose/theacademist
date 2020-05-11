import { injectStripe, CardElement } from 'react-stripe-elements'
const createOptions = (fontSize) => {
    return {
      style: {
        base: {
          fontSize,
          color: '#424770',
          letterSpacing: '0.025em',
          fontFamily: 'Source Code Pro, Menlo, monospace',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
        invalid: {
          color: '#9e2146',
        },
      },
    };
  };
  
class CheckoutElement extends React.Component{
  handleSubmit = (ev) => {
    ev.preventDefault();
    if (this.props.stripe) {
      this.props.stripe
          .createToken()
          .then(payload => {
            //send to root component by props
            this.props.onData(payload.token.id)
          }
            ); //set token state with token id
        //stripeCharge(token, user_id)
    } else {
      console.log('Form submitted before Stripe.js loaded.');
    }
};
  render(){
    return(
	<form onSubmit={this.handleSubmit}>
  <div className="checkout">
        <CardElement
        className="StripeElement"
        {...createOptions('18px')}
        />
    </div>
    <br />
        <a onClick={this.handleSubmit} className="button yellowBtn">Pay</a>
	</form>
  )
  }
}
export default injectStripe(CheckoutElement)
