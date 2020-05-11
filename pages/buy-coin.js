import Layout from "../components/Layout";
import { authInitialProps, getClientSideToken, getServerSideToken } from "../lib/auth";
import Moment from 'react-moment';
import Head from 'next/head'
import Fetch from 'isomorphic-unfetch'
import CheckoutForm from '../components/stripeCheckout'
import '../main.css'
import Router from 'next/router'
import {
    CardElement,
    CardNumberElement,
    CardExpiryElement,
    CardCVCElement,
    PostalCodeElement,
    PaymentRequestButtonElement,
    StripeProvider,
    Elements,
    injectStripe,
  } from 'react-stripe-elements';
  import PaypalExpressBtn from 'react-paypal-express-checkout';
  const countryCurrency = [
    {"country" : "Afghanistan" , "currency_code" : "AFN"},
    {"country" : "Albania" , "currency_code" : "ALL"},
    {"country" : "Algeria" , "currency_code" : "DZD"},
    {"country" : "American Samoa" , "currency_code" : "USD"},
    {"country" : "Andorra" , "currency_code" : "EUR"},
    {"country" : "Angola" , "currency_code" : "AOA"},
    {"country" : "Anguilla" , "currency_code" : "XCD"},
    {"country" : "Antarctica" , "currency_code" : "XCD"},
    {"country" : "Antigua and Barbuda" , "currency_code" : "XCD"},
    {"country" : "Argentina" , "currency_code" : "ARS"},
    {"country" : "Armenia" , "currency_code" : "AMD"},
    {"country" : "Aruba" , "currency_code" : "AWG"},
    {"country" : "Australia" , "currency_code" : "AUD"},
    {"country" : "Austria" , "currency_code" : "EUR"},
    {"country" : "Azerbaijan" , "currency_code" : "AZN"},
    {"country" : "Bahamas" , "currency_code" : "BSD"},
    {"country" : "Bahrain" , "currency_code" : "BHD"},
    {"country" : "Bangladesh" , "currency_code" : "BDT"},
    {"country" : "Barbados" , "currency_code" : "BBD"},
    {"country" : "Belarus" , "currency_code" : "BYR"},
    {"country" : "Belgium" , "currency_code" : "EUR"},
    {"country" : "Belize" , "currency_code" : "BZD"},
    {"country" : "Benin" , "currency_code" : "XOF"},
    {"country" : "Bermuda" , "currency_code" : "BMD"},
    {"country" : "Bhutan" , "currency_code" : "BTN"},
    {"country" : "Bolivia" , "currency_code" : "BOB"},
    {"country" : "Bosnia-Herzegovina" , "currency_code" : "BAM"},
    {"country" : "Botswana" ,"currency_code" : "BWP"},
    {"country" : "Bouvet Island" ,"currency_code" : "NOK"},
    {"country" : "Brazil" ,"currency_code" : "BRL"},
    {"country" : "British Indian Ocean Territory" ,"currency_code" : "USD"},
    {"country" : "Brunei Darussalam" , "currency_code" : "BND"},
    {"country" : "Bulgaria" , "currency_code" : "BGN"},
    {"country" : "Burkina Faso" , "currency_code" : "XOF"},
    {"country" : "Burundi" , "currency_code" : "BIF"},
    {"country" : "Cambodia" , "currency_code" : "KHR"},
    {"country" : "Cameroon" , "currency_code" : "XAF"},
    {"country" : "Canada" , "currency_code" : "CAD"},
    {"country" : "Cape Verde" , "currency_code" : "CVE"},
    {"country" : "Cayman Islands" , "currency_code" : "KYD"},
    {"country" : "Central African Republic" ,"currency_code" : "XAF"},
    {"country" : "Chile" , "currency_code" : "CLP"},
    {"country" : "China" , "currency_code" : "CNY"},
    {"country" : "Christmas Island" , "currency_code" : "AUD"},
    {"country" : "Cocos (Keeling) Islands", "currency_code" : "AUD"},
    {"country" : "Colombia" , "currency_code" : "COP"},
    {"country" : "Comoros" , "currency_code" : "KMF"},
    {"country" : "Congo" , "currency_code" : "XAF"},
    {"country" : "Congo, Dem. Republic", "currency_code" : "CDF"},
    {"country" : "Cook Islands" , "currency_code" : "NZD"},
    {"country" : "Costa Rica" , "currency_code" : "CRC"},
    {"country" : "Croatia" , "currency_code" : "HRK"},
    {"country" : "Cuba" , "currency_code" : "CUP"},
    {"country" : "Cyprus" , "currency_code" : "EUR"},
    {"country" : "Czech Rep. ", "currency_code" : "CZK"},
    {"country" : "Denmark" , "currency_code" : "DKK"},
    {"country" : "Djibouti" , "currency_code" : "DJF"},
    {"country" : "Dominica" , "currency_code" : "XCD"},
    {"country" : "Dominican Republic" , "currency_code" : "DOP"},
    {"country" : "Ecuador" , "currency_code" : "ECS"},
    {"country" : "Egypt" , "currency_code" : "EGP"},
    {"country" : "El Salvador" , "currency_code" : "SVC"},
    {"country" : "Equatorial Guinea" , "currency_code" : "XAF"},
    {"country" : "Eritrea" , "currency_code" : "ERN"},
    {"country" : "Estonia" , "currency_code" : "EUR"},
    {"country" : "Ethiopia" , "currency_code" : "ETB"},
    {"country" : "European Union" , "currency_code" : "EUR"},
    {"country" : "Falkland Islands (Malvinas) ","currency_code" : "FKP"},
    {"country" : "Faroe Islands", "currency_code" : "DKK"},
    {"country" : "Fiji" , "currency_code" : "FJD"},
    {"country" : "Finland" , "currency_code" : "EUR"},
    {"country" : "France" , "currency_code" : "EUR"},
    {"country" : "French Guiana" , "currency_code" : "EUR"},
    {"country" : "French Southern Territories" ,"currency_code" : "EUR"},
    {"country" : "Gabon" , "currency_code" : "XAF"},
    {"country" : "Gambia" , "currency_code" : "GMD"},
    {"country" : "Georgia" , "currency_code" : "GEL"},
    {"country" : "Germany" , "currency_code" : "EUR"},
    {"country" : "Ghana" , "currency_code" : "GHS"},
    {"country" : "Gibraltar" , "currency_code" : "GIP"},
    {"country" : "Great Britain" , "currency_code" : "GBP"},
    {"country" : "Greece" , "currency_code" : "EUR"},
    {"country" : "Greenland" , "currency_code" : "DKK"},
    {"country" : "Grenada" , "currency_code" : "XCD"},
    {"country" : "Guadeloupe (French) ", "currency_code" : "EUR"},
    {"country" : "Guam (USA) ", "currency_code" : "USD"},
    {"country" : "Guatemala" , "currency_code" : "QTQ"},
    {"country" : "Guernsey" , "currency_code" : "GGP"},
    {"country" : "Guinea" , "currency_code" : "GNF"},
    {"country" : "Guinea Bissau", "currency_code" : "GWP"},
    {"country" : "Guyana" , "currency_code" : "GYD"},
    {"country" : "Haiti" , "currency_code" : "HTG"},
    {"country" : "Heard Island and McDonald Islands","currency_code" : "Australian Dollar" ,"currency_code" : "AUD"},
    {"country" : "Honduras" , "currency_code" : "HNL"},
    {"country" : "Hong Kong" , "currency_code" : "HKD"},
    {"country" : "Hungary" , "currency_code" : "HUF"},
    {"country" : "Iceland" , "currency_code" : "ISK"},
    {"country" : "India" , "currency_code" : "INR"},
    {"country" : "Indonesia" , "currency_code" : "IDR"},
    {"country" : "Iran" , "currency_code" : "IRR"},
    {"country" : "Iraq" , "currency_code" : "IQD"},
    {"country" : "Ireland" , "currency_code" : "EUR"},
    {"country" : "Isle of Man" , "currency_code" : "GBP"},
    {"country" : "Israel" , "currency_code" : "ILS"},
    {"country" : "Italy" , "currency_code" : "EUR"},
    {"country" : "Ivory Coast" , "currency_code" : "XOF"},
    {"country" : "Jamaica" , "currency_code" : "JMD"},
    {"country" : "Japan" , "currency_code" : "JPY"},
    {"country" : "Jersey" , "currency_code" : "GBP"},
    {"country" : "Jordan" , "currency_code" : "JOD"},
    {"country" : "Kazakhstan" , "currency_code" : "KZT"},
    {"country" : "Kenya" , "currency_code" : "KES"},
    {"country" : "Kiribati" , "currency_code" : "AUD"},
    {"country" : "Kuwait" , "currency_code" : "KWD"},
    {"country" : "Kyrgyzstan" , "currency_code" : "KGS"},
    {"country" : "Laos" , "currency_code" : "LAK"},
    {"country" : "Latvia" , "currency_code" : "LVL"},
    {"country" : "Lebanon" , "currency_code" : "LBP"},
    {"country" : "Lesotho" , "currency_code" : "LSL"},
    {"country" : "Liberia" , "currency_code" : "LRD"},
    {"country" : "Libya" , "currency_code" : "LYD"},
    {"country" : "Liechtenstein" , "currency_code" : "CHF"},
    {"country" : "Lithuania" , "currency_code" : "LTL"},
    {"country" : "Luxembourg" , "currency_code" : "EUR"},
    {"country" : "Macau" , "currency_code" : "MOP"},
    {"country" : "Macedonia" , "currency_code" : "MKD"},
    {"country" : "Madagascar" , "currency_code" : "MGF"},
    {"country" : "Malawi" , "currency_code" : "MWK"},
    {"country" : "Malaysia" , "currency_code" : "MYR"},
    {"country" : "Maldives" , "currency_code" : "MVR"},
    {"country" : "Mali" , "currency_code" : "XOF"},
    {"country" : "Malta" , "currency_code" : "EUR"},
    {"country" : "Marshall Islands" , "currency_code" : "USD"},
    {"country" : "Martinique (French)", "currency_code" : "EUR"},
    {"country" : "Mauritania" , "currency_code" : "MRO"},
    {"country" : "Mauritius" , "currency_code" : "MUR"},
    {"country" : "Mayotte" , "currency_code" : "EUR"},
    {"country" : "Mexico" , "currency_code" : "MXN"},
    {"country" : "Micronesia" , "currency_code" : "USD"},
    {"country" : "Moldova" , "currency_code" : "MDL"},
    {"country" : "Monaco" ,"currency_code" : "EUR"},
    {"country" : "Mongolia" , "currency_code" : "MNT"},
    {"country" : "Montenegro" , "currency_code" : "EUR"},
    {"country" : "Montserrat" , "currency_code" : "XCD"},
    {"country" : "Morocco" , "currency_code" : "MAD"},
    {"country" : "Mozambique" , "currency_code" : "MZN"},
    {"country" : "Myanmar" , "currency_code" : "MMK"},
    {"country" : "Namibia" , "currency_code" : "NAD"},
    {"country" : "Nauru" , "currency_code" : "AUD"},
    {"country" : "Nepal" , "currency_code" : "NPR"},
    {"country" : "Netherlands" , "currency_code" : "EUR"},
    {"country" : "Netherlands Antilles" , "currency_code" : "ANG"},
    {"country" : "New Caledonia (French) ", "currency_code" : "XPF"},
    {"country" : "New Zealand" , "currency_code" : "NZD"},
    {"country" : "Nicaragua" , "currency_code" : "NIO"},
    {"country" : "Niger" , "currency_code" : "XOF"},
    {"country" : "Nigeria" , "currency_code" : "NGN"},
    {"country" : "Niue" , "currency_code" : "NZD"},
    {"country" : "Norfolk Island" , "currency_code" : "AUD"},
    {"country" : "North Korea" , "currency_code" : "KPW"},
    {"country" : "Northern Mariana Islands" ,"currency_code" : "USD"},
    {"country" : "Norway" , "currency_code" : "NOK"},
    {"country" : "Oman" , "currency_code" : "OMR"},
    {"country" : "Pakistan" , "currency_code" : "PKR"},
    {"country" : "Palau" , "currency_code" : "USD"},
    {"country" : "Panama" , "currency_code" : "PAB"},
    {"country" : "Papua New Guinea" , "currency_code" : "PGK"},
    {"country" : "Paraguay" , "currency_code" : "PYG"},
    {"country" : "Peru" , "currency_code" : "PEN"},
    {"country" : "Philippines" , "currency_code" : "PHP"},
    {"country" : "Pitcairn Island" , "currency_code" : "NZD"},
    {"country" : "Poland" , "currency_code" : "PLN"},
    {"country" : "Polynesia (French) ", "currency_code" : "XPF"},
    {"country" : "Portugal" , "currency_code" : "EUR"},
    {"country" : "Puerto Rico" , "currency_code" : "USD"},
    {"country" : "Qatar" , "currency_code" : "QAR"},
    {"country" : "Reunion (French) ", "currency_code" : "EUR"},
    {"country" : "Romania" , "currency_code" : "RON"},
    {"country" : "Russia" , "currency_code" : "RUB"},
    {"country" : "Rwanda" , "currency_code" : "RWF"},
    {"country" : "Saint Helena" ,"currency_code" : "SHP"},
    {"country" : "Saint Kitts and Nevis Anguilla" ,"currency_code" : "XCD"},
    {"country" : "Saint Lucia" ,"currency_code" : "XCD"},
    {"country" : "Saint Pierre and Miquelon", "currency_code" : "EUR"},
    {"country" : "Saint Vincent and the Grenadines" ,"currency_code" : "XCD"},
    {"country" : "Samoa" ,"currency_code" : "WST"},
    {"country" : "San Marino" , "currency_code" : "EUR"},
    {"country" : "Sao Tome and Principe", "currency_code" : "STD"},
    {"country" : "Saudi Arabia" , "currency_code" : "SAR"},
    {"country" : "Senegal" , "currency_code" : "XOF"},
    {"country" : "Serbia" , "currency_code" : "RSD"},
    {"country" : "Seychelles" , "currency_code" : "SCR"},
    {"country" : "Sierra Leone" , "currency_code" : "SLL"},
    {"country" : "Singapore" , "currency_code" : "SGD"},
    {"country" : "Slovakia" , "currency_code" : "EUR"},
    {"country" : "Slovenia" , "currency_code" : "EUR"},
    {"country" : "Solomon Islands" , "currency_code" : "SBD"},
    {"country" : "Somalia" , "currency_code" : "SOS"},
    {"country" : "South Africa" , "currency_code" : "ZAR"},
    {"country" : "South Korea" , "currency_code" : "KRW"},
    {"country" : "South Sudan" , "currency_code" : "SSP"},
    {"country" : "Spain" , "currency_code" : "EUR"},
    {"country" : "Sri Lanka" , "currency_code" : "LKR"},
    {"country" : "Sudan" , "currency_code" : "SDG"},
    {"country" : "Suriname" , "currency_code" : "SRD"},
    {"country" : "Svalbard and Jan Mayen Islands" ,"currency_code" : "NOK"},
    {"country" : "Swaziland" , "currency_code" : "SZL"},
    {"country" : "Sweden" , "currency_code" : "SEK"},
    {"country" : "Switzerland" , "currency_code" : "CHF"},
    {"country" : "Syria" , "currency_code" : "SYP"},
    {"country" : "Taiwan" , "currency_code" : "TWD"},
    {"country" : "Tajikistan" , "currency_code" : "TJS"},
    {"country" : "Tanzania" , "currency_code" : "TZS"},
    {"country" : "Thailand" , "currency_code" : "THB"},
    {"country" : "Togo" , "currency_code" : "XOF"},
    {"country" : "Tokelau" , "currency_code" : "NZD"},
    {"country" : "Tonga", "currency_code" : "TOP"},
    {"country" : "Trinidad and Tobago" , "currency_code" : "TTD"},
    {"country" : "Tunisia" , "currency_code" : "TND"},
    {"country" : "Turkey" , "currency_code" : "TRY"},
    {"country" : "Turkmenistan" , "currency_code" : "TMT"},
    {"country" : "Turks and Caicos Island", "currency_code" : "USD"},
    {"country" : "Tuvalu" , "currency_code" : "AUD"},
    {"country" : "U.K. ", "currency_code" : "GBP"},
    {"country" : "Uganda" , "currency_code" : "UGX"},
    {"country" : "Ukraine" , "currency_code" : "UAH"},
    {"country" : "United Arab Emirates" , "currency_code" : "AED"},
    {"country" : "Uruguay" ,"currency_code" : "UYU"},
    {"country" : "USA" ,"currency_code" : "USD"},
    {"country" : "USA Minor Outlying Islands" ,"currency_code" : "USD"},
    {"country" : "Uzbekistan" ,"currency_code" : "UZS"},
    {"country" : "Vanuatu" , "currency_code" : "VUV"},
    {"country" : "Vatican" , "currency_code" : "EUR"},
    {"country" : "Venezuela" , "currency_code" : "VEF"},
    {"country" : "Vietnam" , "currency_code" : "VND"},
    {"country" : "Virgin Islands (British) ", "currency_code" : "USD"},
    {"country" : "Virgin Islands (USA) ", "currency_code" : "USD"},
    {"country" : "Wallis and Futuna Islands" , "currency_code" : "XPF"},
    {"country" : "Western Sahara" , "currency_code" : "MAD"},
    {"country" : "Yemen" , "currency_code" : "YER"},
    {"country" : "Zambia" , "currency_code" : "ZMW"},
    {"country" : "Zimbabwe" , "currency_code" : "ZWD" }
    
]
let shipping = 1;	
    let env = 'production'; // you can set here to 'production' for production
    let currency = 'USD'; // or you can set this value from your props or state  
    let total = 1.99; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
    // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/
    let styles = {
        size: 'responsive',
        color: 'gold',
        shape: 'pill',
    }

    const client = {
        sandbox:    'AcphHl8MmA17YkUMZ1B6Ik1yAwlHLCtjm6Kt94wDliCu9wdPFFwlWwbIEKz2TxUXXYCN1K6DgQAKmV4x',
        production: 'AdTNa3E7DXeBoW-cjhAD_Gmwe8FjS16YcD3ii3WS8dELokeSqDh0tLqOTGiRollGfVVbCI6O0sIii_43',
    }
let range = (start,end) => {
    let list = [];

    for(let i=start; i<=end; i++)
        list.push(i);

    return list;    
  };
  
  
class BuyCoin extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            step: 1, 
            currencyUser: 0, 
            stripeToken: '', 
            paymentID: '',
            coinNumber: 0, 
            coinPrice: 0, 
            userid: 0, 
            fetching: false, 
            created: false,
            currencySymbol: '$',
            exchangeRate: 0,
            isloading: false
        }
    }
    componentDidMount(){
        //this.onOpenModal()
    const { user = {} } = this.props.auth || {};
      if(user.type == "authenticated"){
        this.getCurrency()
      }else{
          Router.push('/login')
      }
    }
    onNextStep(number, price){
        const {step} = this.state
        this.setState({step: step + 1, coinNumber: number, coinPrice: price})
    }
    onSuccess = (payment) => {
        // Congratulation, it came here means everything's fine!
        this.setState({paymentID: payment.paymentID});
                //console.log("The payment was succeeded!", payment);
                // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
        //verify paypal here
        this.verifyPaypal()
    }		
    
    onCancel = (data) => {
        // User pressed "cancel" or close Paypal's popup!
        
        //console.log('The payment was cancelled!', data);
        console.log('You cancelled Paypal payment, select payment method to buy coin');
        // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
    }	
    
    onError = (err) => {
        // The main Paypal's script cannot be loaded or somethings block the loading of that script!
        //console.log("Error!", err);
        console.log('An error occured please contact customer service');
        // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
        // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear			
    }	
    paidSuccess = ()=>{
        const {step} = this.state;
        this.setState({step: step + 1})
    }
    verifyPaypal = () => {
        const {paymentID, coinPrice, coinNumber, currencyUser} = this.state;
        const { user = {} } = this.props.auth || {};
        console.log(user.user_id)
        //send payment id to services paypal endpoint
        fetch('https://www.theacademist.com/services/paypal/{user_id}'.replace('{user_id}', user.user_id), {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': user.token},
            body: JSON.stringify({paymentID: paymentID, coin: coinNumber, price: coinPrice})
        })
            .then(response=>response.json())
            .then(json=>{
                if (json.error)
                    throw Error(json.error.message || 'Unknown fetch error');
                //this.setState({fetching: false, error: undefined, created: true});
                this.paidSuccess();
            })
            //.catch(error=>{ this.setState({fetching: false, error: error.message});});
    }
    stripeCharge = ()=> {
        const { step, currencyUser, stripeToken, coinNumber, coinPrice, created } = this.state;
        const { user = {} } = this.props.auth || {};
        console.log(user.user_id)
        let coin = coinNumber;
        let amount = coinPrice*100;
        let token = stripeToken;
        let currency = currencyUser;
        //send token to stripe for charge
        console.log(coin, amount, token, currencyUser);
        fetch('https://www.theacademist.com/services/stripe_pay/{user_id}'.replace('{user_id}', user.user_id), {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': user.token},
            mode: 'cors',
            body: JSON.stringify({coin, amount, token, currency})
        })
            .then(response=>response.json())
            .then(json=>{
                if (json.error)
                    throw Error(json.error.message || 'Unknown fetch error');
                this.paidSuccess()
            })
            .catch(error=>{ console.log(error)}) 
    }
    getCurrency(){
        this.setState({isloading: true});
        return fetch(`https://www.theacademist.com/services/ip-currency`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            mode: 'cors',
        })
        .then( 
            response => response.json() 
        )
        .then(
            data => {
                this.setState({isloading: false, currencyCode: data.geoplugin_currencyCode, currencySymbol: data.geoplugin_currencySymbol_UTF8}, ()=>{
                    this.apiRequest(data.geoplugin_currencyCode);
                    //console.log(this.state.currencySymbol);
                })
            }
        )
    }
    apiRequest(currency){
        this.setState({isloading: true});
        return fetch(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=${currency}&apikey=O6V1VXTCO92BKKL1`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
        .then( 
            response => response.json() 
        )
        .then(
            data => {
                //console.log(data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
                this.setState({isloading: false, exchangeRate: data['Realtime Currency Exchange Rate']['5. Exchange Rate']}, ()=> {
                    //console.log(this.state.exchangeRate)
                })
            }
        )
    }
    setToken = (token) =>{
        this.setState({stripeToken: token},()=>{
            //console.log("parent component")
            //console.log(this.state.stripeToken)
            this.stripeCharge()
        })
    }
    render(){
        const {step} = this.state;
        const {currencySymbol, exchangeRate} = this.state
        const oneCoinPrice = Math.round((1.99 * this.state.exchangeRate)*100) / 100;
        const twoCoinPrice = Math.round((2.99 * this.state.exchangeRate)*100) / 100;
        const threeCoinPrice = Math.round((3.99 * this.state.exchangeRate)*100) / 100;
        const { user = {} } = this.props.auth || {};
        const loggedIn = (Object.keys(user).length > 0 )
        //console.log(loggedIn)
        if(step == 1){
        return(
        
        <Layout title="Buy Coin" {...this.props}>
        
        <section className="section buy-coins">
        <div className="container">

            <div className="content">

                <div className="columns is-centered">
                  <div className="column is-four-fifths has-text-centered long-rounded grey">

                          <h3 className="title ">Each coin you buy gives you the opportunity to search 
                                            twice on the scholarship page
                          </h3>

                          <div className="buy-progress-bar columns is-centered">

                              <div className="column is-half is-9-tablet">
                                  <ul className="progressbar">
                                    <li className="active"><span className="circle"></span><span className="progress-bar-step-title">Coin</span></li>
                                    <li className={
                                            this.state.step == 2?
                                            'active':
                                            ''
                                        }><span className="circle"></span><span className="progress-bar-step-title">Pay</span></li>
                                    <li className={
                                            this.state.step == 3?
                                            'active':
                                            ''
                                        }><span className="circle"></span><span className="progress-bar-step-title">Success</span></li>
                                  </ul>
                              </div>
                            

                          </div>

                          <div className="columns is-centered">
                            <div className="column is-11">

                              <div className="columns is-centered is-vcentered">

                                      <div className="column has-text-centered">                                        
                                        <a onClick={()=>this.onNextStep(1, oneCoinPrice)}>
                                          <div className="buy-coins-block">
                                            <h4 className="buy-x-coins">Buy<span>1</span>Coin</h4>
                                            <img src="/static/images/buy1coin.png" />
                                            <p className="buy-coins-price">{this.state.currencySymbol}{oneCoinPrice}</p>
                                          </div>
                                        </a>
                                      </div>

                                      <div className="column has-text-centered">
                                        <a onClick={()=>this.onNextStep(2, oneCoinPrice)}>
                                          <div className="buy-coins-block">
                                            <h4 className="buy-x-coins">Buy<span>2</span>Coins</h4>
                                            <img src="/static/images/buy2coins.png" />
                                            <p className="buy-coins-price">{this.state.currencySymbol}{twoCoinPrice}</p>
                                          </div>
                                        </a>
                                      </div>

                                      <div className="column has-text-centered">
                                        <a onClick={()=>this.onNextStep(3, oneCoinPrice)}>
                                          <div className="buy-coins-block">
                                            <h4 className="buy-x-coins">Buy<span>3</span>Coins</h4>
                                            <img src="/static/images/buy3coins.png" />
                                            <p className="buy-coins-price">{this.state.currencySymbol}{threeCoinPrice}</p>
                                          </div>
                                        </a>
                                      </div>
                              </div>
                            </div>
                          </div>
                  </div>
                </div>
            </div>
        </div>
    </section>
            </Layout>
        );
        }
        else if(step == 2){
            return(
                <Layout title="Buy Coin" {...this.props}>
               
            <section className="section buy-coins">
            <div className="container">
    
                <div className="content">
    
                    <div className="columns is-centered">
                      <div className="column is-four-fifths has-text-centered long-rounded grey">
    
                              <h3 className="title ">Each coin you buy gives you the opportunity to search 
                                                twice on the scholarship page
                              </h3>
    
                              <div className="buy-progress-bar columns is-centered">
    
                                  <div className="column is-half is-9-tablet">
                                      <ul className="progressbar">
                                        <li className="active"><span className="circle"></span><span className="progress-bar-step-title">Coin</span></li>
                                        <li className={
                                            this.state.step == 2?
                                            'active':
                                            ''
                                        }><span className="circle"></span><span className="progress-bar-step-title">Pay</span></li>
                                        <li className={
                                            this.state.step == 3?
                                            'active':
                                            ''
                                        }><span className="circle"></span><span className="progress-bar-step-title">Success</span></li>
                                      </ul>
                                  </div>
                                
    
                              </div>
    
                              <div className="columns is-centered">
                                <div className="column is-11">
    
                                  <div className="columns is-centered is-vcentered center-now">
                                        
                                        <div className="stripe-container">
                                        <img src="/static/images/cards.png" className="cards-icon"/>
                                        {process.browser?
                                        <CheckoutForm onToken={(e)=>this.setToken(e)}/>
                                        :null
                                        }
                                        </div>
                                        
                                        <div className="paypal-container">
                                        <h4>Paypal</h4>
                                        {process.browser?
                                        <PaypalExpressBtn 
                                            env={env} style={styles} client={client} shipping={shipping} currency={currency} 
                                            total={total} onError={this.onError} onSuccess={this.onSuccess} onCancel={this.onCancel} 
                                        />
                                        :null
                                        }
                                        </div>
                                        
                                  </div>
                                </div>
                              </div>
                      </div>
                    </div>
                </div>
            </div>
        </section>
                </Layout>
            );
        }
        else if(step == 3){
            return(
                <Layout title="Buy Coin" {...this.props}>
            <section className="section buy-coins">
            <div className="container">
    
                <div className="content">
    
                    <div className="columns is-centered">
                      <div className="column is-four-fifths has-text-centered long-rounded grey">
    
                              <h3 className="title ">Each coin you buy gives you the opportunity to search 
                                                twice on the scholarship page
                              </h3>
    
                              <div className="buy-progress-bar columns is-centered">
    
                                  <div className="column is-half is-9-tablet">
                                      <ul className="progressbar">
                                        <li className="active"><span className="circle"></span><span className="progress-bar-step-title">Coin</span></li>
                                        <li className={
                                                this.state.step == 2 || this.state.step == 3?
                                                'active':
                                                ''
                                            }><span className="circle"></span><span className="progress-bar-step-title">Pay</span></li>
                                        <li className={
                                                this.state.step == 3?
                                                'active':
                                                ''
                                            }><span className="circle"></span><span className="progress-bar-step-title">Success</span></li>
                                      </ul>
                                  </div>
                                
    
                              </div>
    
                              <div className="columns is-centered">
                                <div className="column is-11">
    
                                  <div className="columns is-centered is-vcentered">
                                  <div className="row coin_succeess">
                <div className="col-md-4">
                </div>
                <div className="col-md-4 col-sm-12">
                    <div className="col-spaced box">
                    <div className="align-success aligned">
                <svg id="createdAnimation" className="animated" xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 70 70">
                <path id="createdAnimationResult" fill="#D8D8D8" d="M35,60 C21.1928813,60 10,48.8071187 10,35 C10,21.1928813 21.1928813,10 35,10 C48.8071187,10 60,21.1928813 60,35 C60,48.8071187 48.8071187,60 35,60 Z M23.6332378,33.2260427 L22.3667622,34.7739573 L34.1433655,44.40936 L47.776114,27.6305926 L46.223886,26.3694074 L33.8566345,41.59064 L23.6332378,33.2260427 Z"/>
                <circle id="createdAnimationCircle" cx="35" cy="35" r="24" stroke="F6BD27" strokeWidth="2" strokeLinecap="round" fill="transparent"/>
                <polyline id="createdAnimationCheck" stroke="#979797" strokeWidth="2" points="23 34 34 43 47 27" fill="transparent"/>
                </svg></div>
                        <p className="success_text">Payment Success!</p>
                        
                    </div>
                </div>
                <div className="col-md-4">
                </div>
                <br />
                <br />
                </div>
                                  </div>
                                </div>
                              </div>
                      </div>
                    </div>
                </div>
            </div>
        </section>
                </Layout>
            );
        }
        else{
            return(
        
                <Layout title="Buy Coin" {...this.props}>
                
                <section className="section buy-coins">
                <div className="container">
        
                    <div className="content">
        
                        <div className="columns is-centered">
                          <div className="column is-four-fifths has-text-centered long-rounded grey">
        
                                  <h3 className="title ">Each coin you buy gives you the opportunity to search 
                                                    twice on the scholarship page
                                  </h3>
        
                                  <div className="buy-progress-bar columns is-centered">
        
                                      <div className="column is-half is-9-tablet">
                                          <ul className="progressbar">
                                            <li className="active"><span className="circle"></span><span className="progress-bar-step-title">Coin</span></li>
                                            <li className={
                                                    this.state.step == 2 || this.state.step == 3?
                                                    'active':
                                                    ''
                                                }><span className="circle"></span><span className="progress-bar-step-title">Pay</span></li>
                                            <li className={
                                                    this.state.step == 3?
                                                    'active':
                                                    ''
                                                }><span className="circle"></span><span className="progress-bar-step-title">Success</span></li>
                                          </ul>
                                      </div>
                                    
        
                                  </div>
        
                                  <div className="columns is-centered">
                                    <div className="column is-11">
        
                                      <div className="columns is-centered is-vcentered">
        
                                              <div className="column has-text-centered">                                        
                                                <a onClick={()=>this.onNextStep(1, oneCoinPrice)}>
                                                  <div className="buy-coins-block">
                                                    <h4 className="buy-x-coins">Buy<span>1</span>Coin</h4>
                                                    <img src="/static/images/buy1coin.png" />
                                                    <p className="buy-coins-price">{this.state.currencySymbol}{oneCoinPrice}</p>
                                                  </div>
                                                </a>
                                              </div>
        
                                              <div className="column has-text-centered">
                                                <a onClick={()=>this.onNextStep(2, oneCoinPrice)}>
                                                  <div className="buy-coins-block">
                                                    <h4 className="buy-x-coins">Buy<span>2</span>Coins</h4>
                                                    <img src="/static/images/buy2coins.png" />
                                                    <p className="buy-coins-price">{this.state.currencySymbol}{twoCoinPrice}</p>
                                                  </div>
                                                </a>
                                              </div>
        
                                              <div className="column has-text-centered">
                                                <a onClick={()=>this.onNextStep(3, oneCoinPrice)}>
                                                  <div className="buy-coins-block">
                                                    <h4 className="buy-x-coins">Buy<span>3</span>Coins</h4>
                                                    <img src="/static/images/buy3coins.png" />
                                                    <p className="buy-coins-price">{this.state.currencySymbol}{threeCoinPrice}</p>
                                                  </div>
                                                </a>
                                              </div>
                                      </div>
                                    </div>
                                  </div>
                          </div>
                        </div>
                    </div>
                </div>
            </section>
                    </Layout>
                );
        }
    }
}

BuyCoin.getInitialProps = async ({req,query, isClient}) => {
    console.log(isClient)
    const auth =  await authInitialProps()({req}).auth;
    if(!auth){
        Router.push({
          pathname: '/login',
        })
    }
    return {auth}
    
  }

export default BuyCoin;

