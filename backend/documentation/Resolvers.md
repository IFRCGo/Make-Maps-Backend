## Typedefs

<dl>
<dt><a href="#stream">stream</a> : <code>Object</code></dt>
<dd><p>Watches the Disaster collection for changes and publishes an event when a change occurs.</p>
</dd>
<dt><a href="#userQuery">userQuery</a> : <code>Object</code></dt>
<dd><p>GraphQL query for retrieving and manipulating User data</p>
</dd>
<dt><a href="#userMutation">userMutation</a> : <code>Object</code></dt>
<dd><p>GraphQL mutations for creating, updating, and removing User data.</p>
</dd>
</dl>

<dl>
<dt><a href="#DisasterCustomPayload">DisasterCustomPayload</a> : <code>Object</code></dt>
<dd><p>Custom payload type for Disaster mutations</p>
</dd>
<dt><a href="#disasterQuery">disasterQuery</a> : <code>Object</code></dt>
<dd><p>GraphQL query for retrieving and manipulating Disaster data.</p>
</dd>
<dt><a href="#disasterMutation">disasterMutation</a> : <code>Object</code></dt>
<dd><p>GraphQL mutation for creating, updating, and removing Disaster data.</p>
</dd>
<dt><a href="#DrawingLayerQuery">DrawingLayerQuery</a> : <code>Object</code></dt>
<dd><p>GraphQL query for retrieving and manipulating DrawingLayer data.</p>
</dd>
<dt><a href="#DrawingLayerCustomPayload">DrawingLayerCustomPayload</a> : <code>Object</code></dt>
<dd><p>Custom payload type for DrawingLayer mutations</p>
</dd>
<dt><a href="#DrawingLayerMutation">DrawingLayerMutation</a> : <code>Object</code></dt>
<dd><p>GraphQL mutations for creating, updating, and removing drawing layers.</p>
</dd>
<dt><a href="#PinQuery">PinQuery</a> : <code>Object</code></dt>
<dd><p>GraphQL query for retrieving and manipulating Pin data.</p>
</dd>
<dt><a href="#PinCustomPayload">PinCustomPayload</a> : <code>Object</code></dt>
<dd><p>Custom payload type for Pin mutations</p>
</dd>
<dt><a href="#PinMutation">PinMutation</a> : <code>Object</code></dt>
<dd><p>GraphQL mutations for creating, updating, and removing Pin(s)</p>
</dd>
</dl>

<a name="stream"></a>

## stream : <code>Object</code>
Watches the Disaster collection for changes and publishes an event when a change occurs.

**Kind**: global constant  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| on | <code>function</code> | Registers a callback to be called when a change occurs in the collection. |

<a name="userQuery"></a>

## userQuery : <code>Object</code>
GraphQL query for retrieving and manipulating User data

**Kind**: global constant  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| userById | <code>function</code> | graphql-compose-mongoose resolver for retrieving a User by its ID |
| userByIds | <code>function</code> | graphql-compose-mongoose resolver for retrieving multiple User their IDs |
| userOne | <code>function</code> | graphql-compose-mongoose resolver for retrieving a single Users. |
| userMany | <code>function</code> | graphql-compose-mongoose resolver for retrieving multiple Users |
| userDataLoader | <code>function</code> | graphql-compose-mongoose resolver for retrieving a User using DataLoader |
| userDataLoaderMany | <code>function</code> | graphql-compose-mongoose resolver for retrieving multiple Users using DataLoader |
| userByIdLean | <code>function</code> | graphql-compose-mongoose resolver for retrieving a User by its ID using the lean option |
| userByIdsLean | <code>function</code> | graphql-compose-mongoose resolver for retrieving multiple User by their IDs using the lean option for better performance |
| userOneLean | <code>function</code> | graphql-compose-mongoose resolver for retrieving a single User using the lean option |
| userManyLean | <code>function</code> | graphql-compose-mongoose resolver for retrieving multiple Users using the lean option |
| userDataLoaderLean | <code>function</code> | graphql-compose-mongoose resolver for retrieving a User using DataLoader and the lean option for better performance |
| userDataLoaderManyLean | <code>function</code> | graphql-compose-mongoose resolver for retrieving multiple Users using DataLoader and the lean option for better performance |
| userCount | <code>function</code> | graphql-compose-mongoose resolver for retrieving the total number of Users that match the provided filter |
| userConnection | <code>function</code> | graphql-compose-mongoose resolver a connection of Users for pagination purposes |
| userPagination | <code>function</code> | graphql-compose-mongoose resolver for retrieving User documents paginated |

<a name="userMutation"></a>

## userMutation : <code>Object</code>
GraphQL mutations for creating, updating, and removing User data.

**Kind**: global constant  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| userCreateOne | <code>function</code> | graphql-compose-mongoose resolver for creating a new User |
| userCreateMany | <code>function</code> | graphql-compose-mongoose resolver for creating multiple new User |
| userUpdateById | <code>function</code> | graphql-compose-mongoose resolver for updating a User document by their ID |
| userUpdateOne | <code>function</code> | graphql-compose-mongoose resolver for updating a single User that matches the provided filter |
| userUpdateMany | <code>function</code> | graphql-compose-mongoose resolver for updating multiple User that match the provided filter |
| userRemoveById | <code>function</code> | graphql-compose-mongoose resolver for removing a User by their ID |
| userRemoveOne | <code>function</code> | graphql-compose-mongoose resolver for removing a single User that matches the provided filter |
| userRemoveMany | <code>function</code> | graphql-compose-mongoose resolver for removing multiple User documents that match the provided filter |

<a name="DisasterCustomPayload"></a>

## DisasterCustomPayload : <code>Object</code>
Custom payload type for Disaster mutations

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| record.type | <code>Object</code> | The DisasterTC schema type. |

<a name="disasterQuery"></a>

## disasterQuery : <code>Object</code>
GraphQL query for retrieving and manipulating Disaster data.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| disasterById | <code>function</code> | graphql-compose-mongoose resolver for retrieving a disaster by ID. |
| disasterByIds | <code>function</code> | graphql-compose-mongoose resolver for retrieving multiple Disasters by ID. |
| disasterOne | <code>function</code> | graphql-compose-mongoose resolver for retrieving a single Disaster. |
| disasterMany | <code>function</code> | graphql-compose-mongoose resolver for retrieving multiple Disasters. |
| disasterDataLoader | <code>function</code> | graphql-compose-mongoose resolver retrieving a single Disaster using DataLoader. |
| disasterDataLoaderMany | <code>function</code> | graphql-compose-mongoose resolver for retrieving multiple Disasters using DataLoader. |
| disasterByIdLean | <code>function</code> | graphql-compose-mongoose resolver for retrieving a Disaster by ID using the lean option. |
| disasterByIdsLean | <code>function</code> | graphql-compose-mongoose resolver for retrieving multiple Disasters by ID using the lean option. |
| disasterOneLean | <code>function</code> | graphql-compose-mongoose resolver retrieving a single Disaster using the lean option. |
| disasterManyLean | <code>function</code> | graphql-compose-mongoose resolver retrieving multiple Disasters using the lean option. |
| disasterDataLoaderLean | <code>function</code> | graphql-compose-mongoose resolver retrieving a single Disaster using DataLoader and the lean option. |
| disasterDataLoaderManyLean | <code>function</code> | graphql-compose-mongoose resolver for retrieving multiple Disasters using DataLoader and the lean option. |
| disasterCount | <code>function</code> | graphql-compose-mongoose resolver for retrieving the count of all Disasters. |
| disasterConnection | <code>function</code> | graphql-compose-mongoose resolver for retrieving a connection of Disasters. |
| disasterPagination | <code>function</code> | graphql-compose-mongoose resolver for retrieving a paginated list of Disasters. |
| getDisasterData | <code>Object</code> | graphql-compose-mongoose resolver for retrieving a Disaster along with its pins. |
| getDisasterData._id | <code>mongoose.Schema.Types.ObjectId</code> | The ID of the Disaster to retrieve. |
| getDisasterData.type | [<code>DisasterCustomPayload</code>](#DisasterCustomPayload) | The type of the retrieved Disaster. |
| getDisasterData.resolve | <code>function</code> | Custom resolver to get Disaster data as a DisasterCustomPayload. |

<a name="disasterMutation"></a>

## disasterMutation : <code>Object</code>
GraphQL mutation for creating, updating, and removing Disaster data.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| disasterCreateOne | <code>Object</code> | graphql-compose-mongoose resolver to create a single Disaster. |
| disasterCreateMany | <code>Object</code> | graphql-compose-mongoose resolver to create Creates multiple Disasters. |
| disasterUpdateById | <code>Object</code> | graphql-compose-mongoose resolver to update a Disaster by ID. |
| disasterRemoveById | <code>Object</code> | graphql-compose-mongoose resolver to remove a Disaster by ID. |
| disasterRemoveOne | <code>Object</code> | graphql-compose-mongoose resolver to remove a single Disaster. |
| addEmailSubscribers | <code>Object</code> | Custom resolver to adds a user ID to a Disaster's subscriptions. |
| addEmailSubscribers._id | <code>mongoose.Schema.Types.ObjectId</code> | The ID of the Disaster to add a subscriber to. |
| addEmailSubscribers.user_id | <code>mongoose.Schema.Types.ObjectId</code> | The ID of the user to add as a subscriber. |
| addEmailSubscribers.type | [<code>DisasterCustomPayload</code>](#DisasterCustomPayload) | The type of the retrieved Disaster. |
| addEmailSubscribers.resolve | <code>function</code> | Resolves the addEmailSubscribers mutation. |

<a name="DrawingLayerQuery"></a>

## DrawingLayerQuery : <code>Object</code>
GraphQL query for retrieving and manipulating DrawingLayer data.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| drawingLayerById | <code>function</code> | graphql-compose-mongoose resolver for retrieving a drawing layer by ID. |
| drawingLayerByIds | <code>function</code> | graphql-compose-mongoose resolver for retrieving drawing layers by IDs. |
| drawingLayerOne | <code>function</code> | graphql-compose-mongoose resolver for retrieving a single drawing layer. |
| drawingLayerMany | <code>function</code> | graphql-compose-mongoose resolver for retrieving multiple drawing layers. |
| drawingLayerDataLoader | <code>function</code> | graphql-compose-mongoose resolver for loading drawing layers data. |
| drawingLayerDataLoaderMany | <code>function</code> | graphql-compose-mongoose resolver for loading multiple drawing layers data. |
| drawingLayerByIdLean | <code>function</code> | graphql-compose-mongoose resolver for retrieving a drawing layer by ID using lean query. |
| drawingLayerByIdsLean | <code>function</code> | graphql-compose-mongoose resolver for retrieving drawing layers by IDs using lean query. |
| drawingLayerOneLean | <code>function</code> | graphql-compose-mongoose resolver for retrieving single drawing layer using lean query. |
| drawingLayerManyLean | <code>function</code> | graphql-compose-mongoose resolver for retrieving multiple drawing layers using lean query. |
| drawingLayerDataLoaderLean | <code>function</code> | graphql-compose-mongoose resolver for loading drawing layers data using lean query. |
| drawingLayerDataLoaderManyLean | <code>function</code> | graphql-compose-mongoose resolver for loading multiple drawing layers data using lean query. |
| drawingLayerCount | <code>function</code> | graphql-compose-mongoose resolver for counting drawing layers. |
| drawingLayerConnection | <code>function</code> | graphql-compose-mongoose resolver for paginated connection of drawing layers. |
| drawingLayerPagination | <code>function</code> | graphql-compose-mongoose resolver for paginating drawing layers. |

<a name="DrawingLayerCustomPayload"></a>

## DrawingLayerCustomPayload : <code>Object</code>
Custom payload type for DrawingLayer mutations

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| record.type | <code>Object</code> | The DrawingLayerTC schema type |

<a name="DrawingLayerMutation"></a>

## DrawingLayerMutation : <code>Object</code>
GraphQL mutations for creating, updating, and removing drawing layers.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| drawingLayerCreateOne | <code>function</code> | graphql-compose-mongoose resolver for creating a single drawing layer. |
| drawingLayerCreateMany | <code>function</code> | graphql-compose-mongoose resolver for creating multiple drawing layers. |
| drawingLayerUpdateById | <code>function</code> | graphql-compose-mongoose resolver for updating a drawing layer by ID. |
| drawingLayerRemoveById | <code>function</code> | graphql-compose-mongoose resolver for removing drawing layer by ID. |
| drawingLayerRemoveOne | <code>function</code> | graphql-compose-mongoose resolver for removing single drawing layer. |
| drawingLayerCreateOneCustom | <code>function</code> | Custom resolver for creating single drawing layer and publishing an event for subscribers. |
| drawingLayerUpdateByIdCustom | <code>function</code> | Custom resolver for updating drawing layer by ID and publishing an event for subscribers. |
| drawingLayerRemoveOneCustom | <code>function</code> | Custom resolver for removing single drawing layer and publishing an event for subscribers. |

<a name="PinQuery"></a>

## PinQuery : <code>Object</code>
GraphQL query for retrieving and manipulating Pin data.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| pinById | <code>function</code> | graphql-compose-mongoose resolver for retrieving a pin by ID |
| pinByIds | <code>function</code> | graphql-compose-mongoose resolver for retrieving multiple pins by IDs |
| pinOne | <code>function</code> | graphql-compose-mongoose resolver for retrieving a single pin |
| pinMany | <code>function</code> | graphql-compose-mongoose resolver for retrieving multiple pins |
| pinDataLoader | <code>function</code> | graphql-compose-mongoose resolver for retrieving a pin with DataLoader |
| pinDataLoaderMany | <code>function</code> | graphql-compose-mongoose resolver for retrieving multiple pins with DataLoader |
| pinByIdLean | <code>function</code> | graphql-compose-mongoose resolver for retrieving a pin by ID with lean option |
| pinByIdsLean | <code>function</code> | graphql-compose-mongoose resolver for retrieving pins by IDs with lean option |
| pinOneLean | <code>function</code> | graphql-compose-mongoose resolver for retrieving a single pin with lean option |
| pinManyLean | <code>function</code> | graphql-compose-mongoose resolver for retrieving multiple pins with lean option |
| pinDataLoaderLean | <code>function</code> | graphql-compose-mongoose resolver for retrieving a pin with DataLoader and lean option |
| pinDataLoaderManyLean | <code>function</code> | graphql-compose-mongoose resolver for retrieving multiple pins with DataLoader and lean option |
| pinCount | <code>function</code> | graphql-compose-mongoose resolver for counting the number of pins |
| pinConnection | <code>function</code> | graphql-compose-mongoose resolver for pagination with a connection |
| pinPagination | <code>function</code> | graphql-compose-mongoose resolver for pagination |

<a name="PinCustomPayload"></a>

## PinCustomPayload : <code>Object</code>
Custom payload type for Pin mutations

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| record.type | <code>Object</code> | The PinTC schema type |

<a name="PinMutation"></a>

## PinMutation : <code>Object</code>
GraphQL mutations for creating, updating, and removing Pin(s)

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| pinCreateOne | <code>function</code> | graphql-compose-mongoose resolver for creating one pin |
| pinCreateMany | <code>function</code> | graphql-compose-mongoose resolver for creating multiple pins |
| pinUpdateById | <code>function</code> | graphql-compose-mongoose resolver for updating a pin by ID |
| pinRemoveOne | <code>function</code> | graphql-compose-mongoose resolver for removing one pin |
| pinCreateOneCustom | <code>function</code> | Custom resolver for creating one pin and publishing an event for subscribers |
| PinUpdateByIdCustom | <code>function</code> | Custom Mongoose resolver for updating a pin by ID and publishing an event for subscribers |
| pinRemoveOneCustom | <code>function</code> | Custom Mongoose resolver for removing one pin and publishing an event for subscribers |
| pinCreateOneCustom.args | <code>Object</code> | Arguments for the custom create one mutation |
| pinCreateOneCustom.args.record | <code>Object</code> | Input type for the custom create one mutation |
| pinCreateOneCustom.resolve | <code>function</code> | Resolver function for the custom create one mutation |
| PinUpdateByIdCustom.args | <code>Object</code> | Arguments for the custom update by ID mutation |
| PinUpdateByIdCustom.args._id | <code>Object</code> | ID of the pin to be updated |
| PinUpdateByIdCustom.args.record | <code>Object</code> | Input type for the custom update by ID mutation |
| PinUpdateByIdCustom.resolve | <code>function</code> | Resolver function for the custom update by ID mutation |
| pinRemoveOneCustom.args | <code>Object</code> | Arguments for the custom remove one mutation |
| pinRemoveOneCustom.args._id | <code>Object</code> | ID of the pin to be removed |
| pinRemoveOneCustom.resolve | <code>function</code> | Resolver function for the custom remove one mutation |

