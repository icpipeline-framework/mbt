import Principal "mo:base/Principal";
import Blob "mo:base/Blob";
import Nat "mo:base/Nat";
import Nat64 "mo:base/Nat64";
import Int "mo:base/Int";
import Time "mo:base/Time";
import Debug "mo:base/Debug";
import Result "mo:base/Result";


//import ICRC1 "../../../icrc1/src/ICRC1/";

//LOCAL 
//import ICRC1    "ic:q4eej-kyaaa-aaaaa-aaaha-cai";

actor {

 //////////////////////////////
 ////// BEGIN INIT
 //////////////////////////////

//set icrc1 types and vars 

  public type BlockIndex = Nat;
  public type Subaccount = Blob;
  public type Timestamp = Nat64;
  public type Balance = Nat;
  public type TxIndex = Nat;

  public type Account = {
      owner : Principal;
      subaccount : ?Subaccount;
  };

  public type TimeError = {
      #TooOld;
      #CreatedInFuture : { ledger_time : Timestamp };
  };

  public type Mint = {
      to : Account;
      amount : Balance;
      memo : ?Blob;
      created_at_time : ?Nat64;
    };
    
    public type TransferError = TimeError or {
        #BadFee : { expected_fee : Balance };
        #BadBurn : { min_burn_amount : Balance };
        #InsufficientFunds : { balance : Balance };
        #Duplicate : { duplicate_of : TxIndex };
        #TemporarilyUnavailable;
        #GenericError : { error_code : Nat; message : Text };
    };


  public type Result =  {
    #err: TransferError;
    #ok: Balance;
  };

  //MintNowResponse
  public type MintNowResponse = {
    mintResponse: Result.Result<Balance, TransferError>  ;
    msg: Text;
    timeStamp: Int;
    responseStatus: Text;
  };

  //BalanceOfResponse
  public type BalanceOfResponse = {
    accountBalance: Nat ;
    totalSupply: Nat ;
    msg: Text;
    timeStamp: Int;
    responseStatus: Text;
  };
  //BalanceOfResponse
  public type TotalSupplyResponse = {
    totalSupply: Nat ;
    msg: Text;
    timeStamp: Int;
    responseStatus: Text;
  };

  // //LOCAL
  //var icrc1CanisterId : Text = "qhbym-qaaaa-aaaaa-aaafq-cai";
  //STAGE 
  var icrc1CanisterId : Text = "7ldyp-fyaaa-aaaah-ab37a-cai";
  //PROD
  //var icrc1CanisterId : Text = "db3eq-6iaaa-aaaah-abz6a-cai";

  // instantiate the actor for the icrc1 token
  let icrc1CanisterActor = actor(icrc1CanisterId): actor { 
    icrc1_name :() -> async Text ;
    icrc1_balance_of :(Account) -> async Nat ;
    icrc1_total_supply :() -> async Nat ;
    mint :(Mint) -> async Result.Result<Balance, TransferError>  ;
  };

  var now = Time.now();
  Debug.print("INIT Time: " # Int.toText(now));
  

 //////////////////////////////
 ////// END INIT
 //////////////////////////////

 //////////////////////////////
 ////// BEGIN INTERFACES
 //////////////////////////////

  public shared func mintNow(tempMint: Mint) : async MintNowResponse {
  
    now := Time.now(); 
    var tempMsg: Text = "";
    var tempResponseStatus = "Green" ;      

    var tempMintResponse : Result.Result<Balance, TransferError>  = await icrc1CanisterActor.mint(tempMint) ;

    var tempMintNowResponse : MintNowResponse = {
      mintResponse = tempMintResponse ;
      msg = tempMsg;
      timeStamp = now;
      responseStatus = tempResponseStatus;
    };

    return tempMintNowResponse;
  };

  public shared func checkAccountBalance(tempAccount : Account) : async BalanceOfResponse {
  
    now := Time.now(); 
    var tempMsg: Text = "";
    var tempResponseStatus = "Green" ;      

    var tempTotal : Nat = await icrc1CanisterActor.icrc1_total_supply() ;

    var tempAmount : Nat = await icrc1CanisterActor.icrc1_balance_of(tempAccount) ;

    var tempBalanceOfResponse : BalanceOfResponse = {
      accountBalance = tempAmount ;
      totalSupply = tempTotal ;
      msg = tempMsg;
      timeStamp = now;
      responseStatus = tempResponseStatus;
    };

    return tempBalanceOfResponse;
  }; // checkAccountBalance

  public shared func getTotalSupply () : async TotalSupplyResponse {
  
    now := Time.now(); 
    var tempMsg: Text = "";
    var tempResponseStatus = "Green" ;      

    var tempTotal : Nat = await icrc1CanisterActor.icrc1_total_supply() ;

    var tempTotalSupplyResponse : TotalSupplyResponse = {
      totalSupply = tempTotal ;
      msg = tempMsg;
      timeStamp = now;
      responseStatus = tempResponseStatus;
    };

    return tempTotalSupplyResponse;
  }; // getTotalSupply

  // public shared func greet(name : Text) : async Text {
    
  //   var token_name : Text = await icrc1CanisterActor.icrc1_name() ;

  //   return "Hello," # name # ". Say Hi to the " # token_name # "!";
  // };
};
