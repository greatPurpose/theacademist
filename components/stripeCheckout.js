import { StripeProvider, Elements } from 'react-stripe-elements'

import CheckoutElement from './stripeElement'

export default class CheckOutForm extends React.Component{
	render(){
		
		return(
	<StripeProvider apiKey="pk_test_WwdF2h2PYwDQCIJikhCAeBDx">
    
		<Elements>
			<CheckoutElement onData={(e)=> this.props.onToken(e)}/>
		</Elements>
    
	</StripeProvider>
	)
}
}