exports.newProfileFollowers = function newProfileFollowers() {

    let thisObject = {
        profilesValidations: profilesValidations,
        postValidations: postValidations, 
        arrayValidations: arrayValidations
    }

    return thisObject

    function profilesValidations(queryReceived, thisObject) {
        /*
        Validate User Profile
        */
        if (queryReceived.targetUserProfileId !== undefined) {
            thisObject.profile = NT.memory.maps.USER_PROFILES_BY_ID.get(queryReceived.targetUserProfileId)
        }

        if (thisObject.profile === undefined) {
            throw ('Target User Profile Not Found.')
        }
        /*
        Validate Bot Profile
        */
        if (queryReceived.targetBotProfileId !== undefined) {
            thisObject.profile = thisObject.profile.bots.get(queryReceived.targetBotProfileId)
            if (thisObject.profile === undefined) {
                throw ('Target Bot Profile Not Found.')
            }
        }
    }

    function postValidations(queryReceived, thisObject) {
        /*
        Validate Post
        */
        thisObject.post = thisObject.profile.posts.get(queryReceived.targetPostHash)

        if (thisObject.post === undefined) {
            throw ('Target Post Not Found.')
        }
    }

    function arrayValidations(queryReceived, thisObject) {
        /* 
        Validate Initial Index 
        */
        if (queryReceived.initialIndex === undefined) {
            throw ('Initial Index Undefined.')
        }

        if (queryReceived.initialIndex === NT.globals.constants.queries.INITIAL_INDEX_LAST) {
            queryReceived.initialIndex = thisObject.profile.posts.length - 1
        }

        if (queryReceived.initialIndex === NT.globals.constants.queries.INITIAL_INDEX_FIRST) {
            queryReceived.initialIndex = 0
        }

        if (isNaN(queryReceived.initialIndex) === true) {
            throw ('Initial Post Is Not a Number.')
        }

        thisObject.initialIndex = queryReceived.initialIndex
        /* 
        Validate Amount Requested 
        */
        if (queryReceived.amountRequested === undefined) {
            throw ('Amount Requested Undefined.')
        }

        if (isNaN(queryReceived.amountRequested) === true) {
            throw ('Amount Requested Is Not a Number.')
        }

        if (queryReceived.amountRequested < NT.globals.constants.queries.MIN_AMOUNT_REQUESTED) {
            throw ('Amount Requested Below Min.')
        }

        if (queryReceived.amountRequested > NT.globals.constants.queries.MAX_AMOUNT_REQUESTED) {
            throw ('Amount Requested Above Max.')
        }
        /* 
        Validate Direction
        */
        if (queryReceived.direction === undefined) {
            throw ('Direction Undefined.')
        }

        if (queryReceived.direction !== NT.globals.constants.queries.DIRECTION_FUTURE && queryReceived.direction !== NT.globals.constants.queries.DIRECTION_PAST) {
            throw ('Direction Not Supported.')
        }

        thisObject.direction = queryReceived.direction

    }
}