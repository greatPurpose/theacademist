import Layout from "../components/Layout";
import '../main.css'
import { authInitialProps, getClientSideToken, getServerSideToken } from "../lib/auth";

const ReferralTerms = (props)=>{
    return(
        <Layout title="Privacy Policy" {...props}>
        <section className="section legal">
        <div className="container">
            <h3 className="title">Legal</h3>

            <div className="tabs">
                <ul>
                  <li><a href="/terms-of-use">Terms of use</a></li>
                  <li><a href="/privacy-policy">Privacy policy</a></li>
                  <li className="is-active"><a href="/referral-terms">Referral terms</a></li>
                  <li><a href="/disclaimer">Disclaimer</a></li>
                </ul>
            </div>

            <div className="tab-content content">

              <h4>Terms & Condition for “The Academist” Customer Referral Program.</h4>
                
                <p>Welcome to The Academist customer referral program. You’ll find all the legal Terms and Conditions further down the page, but let’s get started with the basics:</p>

                <p>When you refer someone to The Academist and they purchase a paid scholarship search, you’ll each receive a token by each “individual” purchase. You can use this to claim your reward from the reward list stated on our website.</p>

                <p>Your reward will be between getting a free coin for more scholarship search and $5,000, depending on the number of token received from referring unique individuals—and you’re eligible to receive rewards for up to 3 to 25 people referred.</p>
<p>The referral program terms and conditions</p>
<p>The following terms and conditions govern your participation in The Academist Customer Referral Program, which we’ll call “Program” here for short. The Program is run by us; The Academist LLC or The Academist.</p>
<p>The Participants referred to below are you (a Qualified User), and the person you’ve referred (a Referred User). To be eligible for a reward, you, as participants must agree to be bound by the rules described below.</p>
<p>Definitions</p>
<p>Referred User: someone who’s been referred to The Academist by a Qualified User. You become a Referred User by clicking on a Qualified User’s unique referral link and creating a new account on The Academist’s website (Referred Account).</p>
<p>Only the person who creates the Referred Account is considered the Referred User, and there can only be one Referred User for each Referred Account created.</p>
<p>Referred Account: a new The Academist account created by a Referred User through a Qualified User’s unique referral link.</p>
<p>Qualified User: someone who meets all of the following conditions:</p>
<p>an active member of an account that is registered to The Academist website at the time the referral is made</p>
<p>Not classified as an external recruiter/agent/affiliate using The Academist. External recruiters/agent/affiliate are a special class of The Academist users who are sent an invitation to join The Academist by an existing user from within the “Recruiter/Agent/Affiliate” module.</p>
<p>Eligible Referral: A Referred Account qualifies as an Eligible Referral if all of the following conditions are met:</p>
<p>The Referred Account is created on The Academist by the Referred User through the Qualified User’s unique referral link</p>
<p>The Referred User is not a member of any other The Academist account (whether they’re active, expired or canceled or a paid, free or trial account)</p>
<p>The Referred User was not referred to The Academist at an earlier date by someone else</p>
<p>The Qualified User cannot be a member of any multiple The Academist account.</p>
<p>The first payment (one time) submitted by the Referred Account to The Academist was successfully processed</p>
<p>The Referred Account created by the Referred User must not be for a company associated with any other The Academist accounts (whether they’re active, expired or canceled or a paid, free or trial account)</p>
<p>The Qualified User and the Referred User cannot be employed by The Academist</p>
<p>The Referred Account must convert to a paid The Academist subscription within 30 days of the date the Referred User first clicked on the unique referral link from the Qualified User</p>
<p>The Qualified User must not have posted their unique referral link on a “coupon website” or similar website</p>
<p>The Referred User can’t have the same IP address as any other user of The Academist (whether the user is a current or former user) at the time the Referred User signs up</p>
<p>How to earn a token</p>
<p>Refer as much people as you decide. There is no limited number that can be referred with your unique link</p>
<p>For every referral that makes a “purchase” for a scholarship search, registering with your unique link you automatically get credited a token</p>
<p>You can accumulate as much token as possible to claim any of the three (3) reward options available on our website</p>
<p>Multiple entry for the $1000 and $5000 draw prize is allowed</p>
<p>$1000 and $5000 prize money is only payable towards the winner’s tuition of any school of their choice which admission has already being confirmed. There will be no cash payment/claim to the winner of the draw prize</p>
<p>The Academist determines number of prize winner for the $1000 and $5000 draw</p>
<p>Token earned can and only will be applied to get reward from The Academist website.</p>
<p>Overview of Program</p>
<p>To be an eligible participant in the Referral Program, you must meet either of the following conditions:</p>
<p>You’re a Qualified User and the referral you made is deemed an Eligible Referral by The Academist</p>
<p>You’re a Referred User and your Referred Account is deemed an Eligible Referral by The Academist</p>
<p>The value of the Reward will depend on the type of plan that the Referred User purchases when they buy their first subscription to The Academist (whether it’s a monthly or annual subscription).</p>
<p>If you participate in the program as a Qualified User, then a Reward will be given for each Eligible Referral you make. The reward does not increase for each member who joins the Referred Account created; the value of the Reward is based solely on the type of plan purchased by the Referred User.</p>
<p>If you, the Participant, file taxes in the US, you must notify The Academist if you have received $600 or more in Rewards from The Academist during a single calendar year.</p>
<p>If you receive a reward, you (as a Participant) are responsible for all applicable taxes and fees resulting from it. By participating in the Program, you release The Academist and their agents from all liability, including, without limitation, with respect to the Reward. The Academist reserves that right to suspend you as Participant from the Program at any time and reserves the right to cancel, modify or suspend the Program at any time.</p>
<p>Please note that if you are a Qualified User, the name you used to create your The Academist profile may be appended to your unique referral link.</p>
<p>By taking part you agree:</p>
<p>to comply with all applicable commercial and public anti-bribery laws</p>
<p>to send referral emails only to people that you know</p>
<p>not to engage in any activity that may be considered fraudulent or invasive or that may be considered spamming</p>
<p>The Academist reserves the right to change these terms and conditions at any time without notice.</p>
            </div>
        </div>
    </section>

        </Layout>
    );
}

export default ReferralTerms;
ReferralTerms.getInitialProps = async ({req,query}) => {
    const auth =  await authInitialProps()({req}).auth;
    return {auth}
    
  }