
# AP Dev Kit

## Table of Contents

- [Overview](#overview)
- [Requirements](#requirements)
  - [@solana/spl-token](#solanaspl-token)
  - [@solana/wallet-adapter-base](#solanawallet-adapter-base)
  - [@solana/wallet-adapter-wallets](#solanawallet-adapter-wallets)
  - [@solana/web3.js](#solanaweb3js)
  - [jsonwebtoken](#jsonwebtoken)
  - [cookie](#cookie)
  - [smartcontract-jsbindings](#smartcontract-jsbindings)
- [Clients](#clients)
  - [Solana Client Module](#solana-client-module)
    - [Purpose](#purpose)
    - [Imports](#imports)
    - [Export](#export)
  - [Authentication Client Module](#authentication-client-module)
    - [Purpose](#purpose-1)
    - [Imports](#imports-1)
    - [Export](#export-1)
- [Vuex Stores](#vuex-stores)
  - [Program Store State](#program-store-state)
  - [Pools Store State](#pools-store-state)
- [Types](#types)
  - [Staking Types Overview](#staking-types-overview)
    - [PoolData](#pooldata)
    - [Indicator](#indicator)
    - [Pool](#pool)
    - [Stake](#stake)
  - [API Response Types Overview](#api-response-types-overview)
    - [NonceResponse](#nonceresponse)
    - [LoginResponse](#loginresponse)
    - [Result](#result)
    - [ApiResponse](#apiresponse)
  - [Error Types Definition Overview](#error-types-definition-overview)
    - [PhantomError Interface](#phantomerror-interface)
    - [ErrorMessage Enum](#errormessage-enum)
  - [BalanceRequest Interface](#balancerequest-interface)
    - [Overview](#overview-1)
    - [Imports](#imports-2)
    - [Interface](#interface)
- [Services](#services)
  - [Solana Blockchain Interaction Module](#solana-blockchain-interaction-module)
    - [Imports](#imports-3)
    - [Exported Functions](#exported-functions)
    - [Utility Functions](#utility-functions)
    - [Constants](#constants)
  - [Pools Service](#pools-service)
    - [Imports](#imports-4)
    - [Exported Functions](#exported-functions-1)
  - [User Services](#user-services)
    - [Imports](#imports-5)
    - [Enumerations](#enumerations)
    - [Types](#types-1)
    - [Exported Functions](#exported-functions-2)
- [WordPress Plugin](#wordpress-plugin)
  - [Access Protocol Custom Field Overview](#access-protocol-custom-field-overview)
  - [WordPress Access](#wordpress-access)
    - [Example Usage with a Post Variable](#example-usage-with-a-post-variable)


## Overview

The AP Dev Kit encapsulates all the essential components for a successful integration with Access Protocol, serving as a versatile guide for developers. It enables smart contract interactions, account management, and staking functionalities within the Access Protocol ecosystem, paired with a Nuxt v2 front-end. Additionally, it offers a starting point for a WordPress integration, providing a blueprint for managing premium content access and facilitating further development and custom implementations.


## Requirements

### @solana/spl-token
"0.1.8" - This package provides utility functions and classes for working with SPL Tokens on the Solana blockchain, which are similar to ERC-20 tokens on Ethereum.

### @solana/wallet-adapter-base
"^0.9.5" - This is a base package for Solana wallet adapters, providing interfaces and types which standardize the connection between Solana wallets and applications.

### @solana/wallet-adapter-wallets
"^0.15.5" - This package includes a collection of adapters for popular Solana wallets, allowing seamless integration and interaction with these wallets within your application.

### @solana/web3.js
"^1.47.3" - The Solana JavaScript API library (web3.js) enables communication with the Solana blockchain, offering functions to send transactions, query balances and state, and listen for events.

### jsonwebtoken
"*" - For creating and verifying JSON Web Tokens.

### cookie
"*" - For parsing and serializing cookies.

### @theblockcrypto/ap / @access-protocol/js
"0.2.11" - [smartcontract-jsbindings](#smartcontract-jsbindings)


### smartcontract-jsbindings (== '@theblockcrypto/ap') (== '@access-protocol/js')

The `smartcontract-jsbindings` folder contains the Javascript bindings of the smart contract. This package is published on NPM

```
npm i @access-protocol/js
```

```
yarn add @access-protocol/js
```


End to end tests are implemented using `jest`, they can be run using

```
yarn amman:start
yarn jest
```

## Clients
Sever side clients used to interact with Access Protocol on the Solana Network

### Solana Client Module (clients/solana.ts)

#### Purpose
Provides a client in server-side applications like Nuxt.js, Next.js, expressjs or fastify to check if a user has access via the Access Protocol product.

#### Imports
- `Connection, PublicKey`: From `@solana/web3.js` for blockchain interactions.
- `getUserStakeState, getStakeAccount, getPoolData`: From `~/services/access/pools` for accessing stake-related data.

#### Export
- A default function that accepts a configuration object and returns an object with:
  - `userHasAccess`: An asynchronous function that takes a `PublicKey` as an owner and returns a boolean indicating whether the user has access based on their stake state.

#### Example

```typescript
    ...
    // Check amount staked
    const isValidStake = await solana.userHasAccess(new PublicKey(address))
    if (!isValidStake) {
      return new ApiResponse(false, ErrorMessage.InvalidStake)
    }
    ...
```

### Authentication Client Module (clients/auth.ts)

#### Purpose
Manages JWT-based authentication, including signing, decoding, verifying, and token management for server applications.

#### Imports
- `jsonwebtoken`: For creating and verifying JSON Web Tokens.
- `cookie`: For parsing and serializing cookies.

#### Export
- A default function that returns an object with methods for:
  - `sign`: Signs data into a JWT and sets it as a cookie in the response.
  - `decode`: Decodes a JWT to retrieve its payload.
  - `getToken`: Extracts the token from the request cookies.
  - `verify`: Verifies a JWT and executes a callback function.
  - `isValid`: Checks if a token is valid without throwing an error.
  - `validate`: Validates the request's token and assigns payload to the request user object.
  - `destroy`: Clears the authentication cookie from the response.

#### Example

```typescript
import jwt from '~/clients/auth'

function userHasAccessToPost (post, user): boolean {
  if (post?.isAccess) {
    return !!user.hasAccess
  }

  return false
}

...
const auth = jwt($config.JWT_SECRET)

auth.validate(request)

...

if (userHasAccessToPost(post, req.user)) {
    //show full content
}

```


## Vuex Stores

### Program Store State (store/program)

- Interface for the Staking Program
  - `programId`: PublicKey representing the unique identifier for the staking program
  - `connection`: Connection object used to communicate with the Solana blockchain
  - `centralState`: Object that holds the central state of the staking program
  - `unstakeURL`: String URL to be used for unstaking operations

- Default State Function for the Staking Program
  - Returns a default `Program` object with initial empty states:
    - `programId`: Initialized to an empty object, should be replaced with an actual PublicKey
    - `connection`: Initialized to an empty object, to be set up with a Solana blockchain connection
    - `centralState`: Initialized to an empty object, intended to hold stateful information of the program
    - `unstakeURL`: Initialized to an empty string, should be assigned the endpoint for the unstake operation.

### Pools Store State (store/pools)

- State Object for the Staking Application
  - `poolID`: Unique identifier for the staking pool
  - `hasAccess`: Boolean flag indicating if the user has access to premium content
  - `minStake`: Minimum amount of tokens required to stake for access
  - `userBalance`: The current balance of the user's wallet
  - `rewards`: The amount of rewards earned from staking
  - `stakedAmount`: The total amount of tokens the user has staked
  - `stakeAccount`: Object containing details of the user's staking account
  - `stakeKey`: Object holding keys pertaining to the user's stake
  - `stakerAta`: Associated Token Account (ATA) for the staker
  - `stakerAtaAccount`: Object containing the staker's ATA account details
  - `data`: Miscellaneous data related to the staking process or user's stake
  - `associatedWallet`: Boolean indicating if a wallet is associated with the staker
  - `indicators`: Object used for tracking various UI indicators
  - `protocolFee`: The fee charged by the protocol for staking services (2% in this case)
  - `loading`: Boolean flag to indicate if a loading process is ongoing
  - `loadingAction`: Describes the action being performed during loading
  - `error`: String detailing any errors that have occurred during staking operations




## Types

### Staking Types Overview (clients/solana.ts)
This section outlines the types used in the `Staking.ts` module for the staking functionality.

#### PoolData

Represents detailed information about a staking pool.

- `email`: Contact email for the pool.
- `name`: Name of the pool.
- `publicKey`: Solana public key for the pool.
- `description`: Description of the pool.
- `twitter`: Twitter handle associated with the pool.
- `website`: Website URL for the pool.
- `image_url`: URL for the pool's image.
- `hero_image_url`: Optional URL for the pool's hero image.
- `logo_image_url`: Optional URL for the pool's logo.
- `hasAccess`: Boolean indicating access status.

#### Indicator

Describes status indicators for the UI.

- `name`: Name of the indicator.
- `status`: Status level.
- `text`: Descriptive text for the indicator.

#### Pool

Combines `StakePool` from `@theblockcrypto/ap` with `PoolData`.

#### Interface

#### Stake

Defines the structure of a stake in a pool.
- `poolID`: Identifier for the staking pool.
- `data`: Optional `StakePool` data.
- `stakeAccount`: Optional `StakeAccount` information.
- `stakeKey`: Generic key related to the stake.
- `stakerAta`: Public key for the staker's associated token account.
- `stakerAtaAccount`: Account information for the staker's ATA.
- `minStake`: Minimum stake amount required.
- `userBalance`: User's current balance.
- `rewards`: Earned staking rewards.
- `stakedAmount`: Amount staked by the user.
- `associatedWallet`: Indicates if a wallet is associated.
- `indicators`: Collection of `Indicator` objects.
- `protocolFee`: Fee percentage for the protocol.
- `loading`: Indicates if a loading process is in progress.
- `loadingAction`: Describes the current loading action.
- `error`: Details any errors encountered.
- `hasAccess`: Indicates if the user has access (initialized as false).


### API Response Types Overview

The `apiResponse.ts` module defines structures for handling API responses in the system.

#### Interfaces

##### NonceResponse
Describes the response structure for a nonce request.
- `nonce`: A unique string used for security purposes during authentication.

##### LoginResponse
Describes the response structure after a login attempt.
- `token`: A string token representing the user's session or authentication state.

#### Types

##### Result
A union type that can be an `ErrorMessage`, `NonceResponse`, or `LoginResponse`.

#### Class

##### ApiResponse
A class representing a generic API response structure.
- `success`: A boolean indicating if the API request was successful.
- `result`: The content of the response, which can be undefined or any of the types defined by `Result`.

This module provides a standardized way to handle different types of API responses, whether they're related to authentication or error handling.


### Error Types Definition Overview

#### PhantomError Interface
Defines the structure for errors related to the Phantom wallet interactions.
- `code`: Numerical code representing specific error types (e.g., 4900, 4100, 4001, -32000, -32003, -32601, -32603).
- `message`: Descriptive string providing details about the error.

#### ErrorMessage Enum
Enumerates common error messages related to Access Protocol operations.
- `ErrorGeneratingNonce`: Indicates a failure in nonce generation.
- `InvalidNonce`: Specifies that the provided nonce is not valid.
- `InvalidStake`: Denotes an error with the stake operation, such as incorrect parameters or failure in processing.
- `ErrorValidatingNonce`: Signifies an issue encountered during the nonce validation process.

### BalanceRequest Interface

#### Overview
Defines a standard format for requesting the balance of a Solana wallet.

#### Imports
- `Connection`: From the `@solana/web3.js` library, represents a connection to a Solana cluster.
- `PublicKey`: Also from `@solana/web3.js`, denotes a public key on the Solana blockchain.

#### Interface
- `walletPubKey`: A `PublicKey` instance representing the wallet's public key.
- `connection`: An instance of `Connection` to interact with the Solana network.



## Services

### Solana Blockchain Interaction Module (services/solana.ts)

#### Imports
- **`@solana/web3.js`:** 
  - `Connection`: Manages the network connection to Solana.
  - `LAMPORTS_PER_SOL`: Converts lamports to SOL units.
  - `PublicKey`: Works with Solana public keys.
  - `Transaction`: Constructs and signs blockchain transactions.
  - `TransactionInstruction`: Defines transaction instructions.

- **`@solana/wallet-adapter-base`:**
  - `SendTransactionOptions`: Options for transaction sending.

#### Exported Functions
- **`sendTx`**: Sends a transaction and confirms it with the Solana network.
- **`getSOLBalance`**: Retrieves and returns the SOL balance for a given public key.

#### Utility Functions
- `sleep`: Delays execution for a set amount of milliseconds.
- `confirmTransaction`: Confirms the transaction on the network, with retry logic.

#### Constants:
- `MAX_CONFIRM_ATTEMPTS`: Maximum number of attempts to confirm a transaction.

### Pools Service (services/access/pools.ts)

The Pools Service module provides a set of functions for managing and interacting with staking pools on the Solana blockchain.

#### Imports
- `@solana/web3.js`: Provides the core Solana blockchain interaction functionality.
- `@solana/spl-token`: Solana's token program library, for working with SPL tokens.
- `@theblockcrypto/ap`: Contains the Access Protocol's specific staking logic.
- `@/services/solana`: A local module for handling Solana transactions.

#### Exported Functions
- `getPoolData`: Retrieves the details of a staking pool.
- `getStakeAccount`: Obtains information about a staker's account.
- `createAccessStakeAccount`: Creates a new staking account under the Access Protocol.
- `getAssociatedTokenAddressAndAccount`: Finds the associated token address and account details for a user.
- `createAssociatedTokenAccountInstruction`: Creates a token account associated with the user's staking account.
- `claimAccessRewards`: Claims rewards for participating in staking.
- `stakeToPool`: Facilitates staking operations by processing staking transactions.
- `getBondAccounts`: Gathers bond account data for a given owner.
- `getUserStakeState`: Evaluates the staking status and access eligibility of a user.
- `getBondAccountStakeAmounts`: Computes the total staked amount within bond accounts.
- `crankAccessPool`: Processes staking pool transactions through the crank instruction.
- `calculateRewardForStaker`: Calculates potential rewards for a staker based on various parameters.
- `calculateRewardForPool`: Estimates the rewards for a pool over a period of unclaimed days.


### User Services

This module (service/access/user.ts) includes functionalities related to user operations within a Solana-based application.

#### Imports
- `@solana/spl-token`: Provides functionality for handling SPL tokens on the Solana blockchain.
- `@solana/web3.js`: Core library for Solana blockchain interaction.
- `bn.js`: Library for working with big numbers in JavaScript.
- `selectn`: A utility for safely accessing nested JavaScript properties.

#### Enumerations
- `UserRole`: Defines user roles within the system, such as `User` and `Admin`.

#### Types
- `UserData`: Defines the structure for user data, including their balance and role.

#### Exported Functions
- `fetchAssociatedTokenAddress`: Retrieves the associated token address for a given public key.
- `fetchUser`: Fetches and returns user data, including balance and role determination based on authority comparison.

## WordPress Plugin

Add Access Protocol fields to the post editor. This will only add fields if Advanced Custom Fields Pro is installed (https://www.advancedcustomfields.com/) , it does not affect the frontend of a site at all by itself.

### Access Protocol Custom Field Overview

- **Title**: Access Protocol
- **Field Key**: `field_ap-post-is-access`
- **Name**: `ap-post-is-access`
- **Type**: `true_false` (Boolean)
- **Default Value**: `0` (False)
- **Message**: 'Is Access'
- **Instructions**: Set a flag in WordPress to enable Access Protocol for a post. Specify additional post types if necessary.

### WordPress Access

This custom field is accessible on the post edit screen within the WordPress dashboard.

#### Example Usage with a Post Variable

To check the Access Protocol state for a post:

```php
$is_access = get_field('ap-post-is-access', $post->ID);
```