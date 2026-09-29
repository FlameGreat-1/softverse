> ## Documentation Index
> Fetch the complete documentation index at: https://cal.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Create a booking

> 
      POST /v2/bookings is used to create regular bookings, recurring bookings and instant bookings. The request bodies for all 3 are almost the same except:
      If eventTypeId in the request body is id of a regular event, then regular booking is created.

      If it is an id of a recurring event type, then recurring booking is created.

      Meaning that the request bodies are equal but the outcome depends on what kind of event type it is with the goal of making it as seamless for developers as possible.

      For team event types it is possible to create instant meeting. To do that just pass `"instant": true` to the request body.

      The start needs to be in UTC aka if the timezone is GMT+2 in Rome and meeting should start at 11, then UTC time should have hours 09:00 aka without time zone.

      Finally, there are 2 ways to book an event type belonging to an individual user:
      1. Provide `eventTypeId` in the request body.
      2. Provide `eventTypeSlug` and `username` and optionally `organizationSlug` if the user with the username is within an organization.

      And 2 ways to book and event type belonging to a team:
      1. Provide `eventTypeId` in the request body.
      2. Provide `eventTypeSlug` and `teamSlug` and optionally `organizationSlug` if the team with the teamSlug is within an organization.

      If you are creating a seated booking for an event type with 'show attendees' disabled, then to retrieve attendees in the response either set 'show attendees' to true on event type level or
      you have to provide an authentication method of event type owner, host, team admin or owner or org admin or owner.

      For event types that have SMS reminders workflow, you need to pass the attendee's phone number in the request body via `attendee.phoneNumber` (e.g., "+19876543210" in international format). This is an optional field, but becomes required when SMS reminders are enabled for the event type. For the complete attendee object structure, see the [attendee object](https://cal.com/docs/api-reference/v2/bookings/create-a-booking#body-attendee) documentation.

      <Note>Please make sure to pass in the cal-api-version header value as mentioned in the Headers section. Not passing the correct value will default to an older version of this endpoint.</Note>
      



## OpenAPI

````yaml /api-reference/v2/openapi.json post /v2/bookings
openapi: 3.0.0
info:
  title: Cal.com API v2
  description: ''
  version: 1.0.0
  contact: {}
servers: []
security: []
tags: []
paths:
  /v2/bookings:
    post:
      tags:
        - Bookings
      summary: Create a booking
      description: |2-

              POST /v2/bookings is used to create regular bookings, recurring bookings and instant bookings. The request bodies for all 3 are almost the same except:
              If eventTypeId in the request body is id of a regular event, then regular booking is created.

              If it is an id of a recurring event type, then recurring booking is created.

              Meaning that the request bodies are equal but the outcome depends on what kind of event type it is with the goal of making it as seamless for developers as possible.

              For team event types it is possible to create instant meeting. To do that just pass `"instant": true` to the request body.

              The start needs to be in UTC aka if the timezone is GMT+2 in Rome and meeting should start at 11, then UTC time should have hours 09:00 aka without time zone.

              Finally, there are 2 ways to book an event type belonging to an individual user:
              1. Provide `eventTypeId` in the request body.
              2. Provide `eventTypeSlug` and `username` and optionally `organizationSlug` if the user with the username is within an organization.

              And 2 ways to book and event type belonging to a team:
              1. Provide `eventTypeId` in the request body.
              2. Provide `eventTypeSlug` and `teamSlug` and optionally `organizationSlug` if the team with the teamSlug is within an organization.

              If you are creating a seated booking for an event type with 'show attendees' disabled, then to retrieve attendees in the response either set 'show attendees' to true on event type level or
              you have to provide an authentication method of event type owner, host, team admin or owner or org admin or owner.

              For event types that have SMS reminders workflow, you need to pass the attendee's phone number in the request body via `attendee.phoneNumber` (e.g., "+19876543210" in international format). This is an optional field, but becomes required when SMS reminders are enabled for the event type. For the complete attendee object structure, see the [attendee object](https://cal.com/docs/api-reference/v2/bookings/create-a-booking#body-attendee) documentation.

              <Note>Please make sure to pass in the cal-api-version header value as mentioned in the Headers section. Not passing the correct value will default to an older version of this endpoint.</Note>
              
      operationId: BookingsController_2026_02_25_createBooking
      parameters:
        - name: cal-api-version
          in: header
          description: Must be set to 2026-02-25.
          required: true
          schema:
            type: string
            example: '2026-02-25'
            default: '2026-02-25'
        - name: Authorization
          in: header
          description: >-
            value must be `Bearer <token>` where `<token>` is api key prefixed
            with cal_, managed user access token, or OAuth access token
          required: false
          schema:
            type: string
        - name: x-cal-secret-key
          in: header
          description: For platform customers - OAuth client secret key
          required: false
          schema:
            type: string
        - name: x-cal-client-id
          in: header
          description: For platform customers - OAuth client ID
          required: false
          schema:
            type: string
      requestBody:
        required: true
        description: >-
          Accepts different types of booking input: Standard Booking, Instant
          Booking, or Recurring Booking.
        content:
          application/json:
            schema:
              oneOf:
                - $ref: '#/components/schemas/CreateBookingInput_2024_08_13'
                  title: Standard Booking
                - $ref: '#/components/schemas/CreateInstantBookingInput_2024_08_13'
                  title: Instant Booking
                - $ref: '#/components/schemas/CreateRecurringBookingInput_2024_08_13'
                  title: Recurring Booking
      responses:
        '201':
          description: ''
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CreateBookingOutput_2024_08_13'
components:
  schemas:
    CreateBookingInput_2024_08_13:
      type: object
      properties:
        start:
          type: string
          description: The start time of the booking in ISO 8601 format in UTC timezone.
          example: '2024-08-13T09:00:00Z'
          format: date-time
        attendee:
          description: The attendee's details.
          allOf:
            - $ref: '#/components/schemas/CreateBookingAttendee'
        bookingFieldsResponses:
          type: object
          additionalProperties: true
          description: >-
            Booking field responses consisting of an object with booking field
            slug as keys and user response as values for custom booking fields
            added by you.
          example:
            customField: customValue
        leadEnrichmentOptOut:
          type: boolean
          description: >-
            The booker's answer to the lead enrichment opt-out, for an event
            type with a workflow that looks bookers up with lead enrichment.
            Send `true` when the booker ticked the opt-out and `false` when they
            were shown it and left it unticked. Sending `false` asserts that the
            booker saw the opt-out. Leave it out when the booker was not shown
            it: a booking without an answer is never looked up.
          example: false
        eventTypeId:
          type: number
          description: >-
            The ID of the event type that is booked. Required unless
            eventTypeSlug and username are provided as an alternative to
            identifying the event type.
          example: 123
        eventTypeSlug:
          type: string
          description: >-
            The slug of the event type. Required along with username / teamSlug
            and optionally organizationSlug if eventTypeId is not provided.
          example: my-event-type
        username:
          type: string
          description: >-
            The username of the event owner. Required along with eventTypeSlug
            and optionally organizationSlug if eventTypeId is not provided.
          example: john-doe
        teamSlug:
          type: string
          description: >-
            Team slug for team that owns event type for which slots are fetched.
            Required along with eventTypeSlug and optionally organizationSlug if
            the team is part of organization
          example: john-doe
        organizationSlug:
          type: string
          description: >-
            The organization slug. Optional, only used when booking with
            eventTypeSlug + username or eventTypeSlug + teamSlug.
          example: acme-corp
        guests:
          description: An optional list of guest emails attending the event.
          example:
            - guest1@example.com
            - guest2@example.com
          type: array
          items:
            type: string
        meetingUrl:
          type: string
          format: uri
          description: >-
            Deprecated - use 'location' instead. Meeting URL just for this
            booking. Displayed in email and calendar event. If not provided then
            cal video link will be generated.
          example: https://example.com/meeting
          deprecated: true
        location:
          description: >-
            One of the event type locations. If instead of passing one of the
            location objects as required by schema you are still passing a
            string please use an object.
          oneOf:
            - $ref: '#/components/schemas/BookingInputAddressLocation_2024_08_13'
              title: Address
            - $ref: >-
                #/components/schemas/BookingInputAttendeeAddressLocation_2024_08_13
              title: Attendee Address
            - $ref: >-
                #/components/schemas/BookingInputAttendeeDefinedLocation_2024_08_13
              title: Attendee Defined
            - $ref: >-
                #/components/schemas/BookingInputAttendeePhoneLocation_2024_08_13
              title: Attendee Phone
            - $ref: '#/components/schemas/BookingInputIntegrationLocation_2024_08_13'
              title: Integration
            - $ref: '#/components/schemas/BookingInputLinkLocation_2024_08_13'
              title: Link
            - $ref: '#/components/schemas/BookingInputPhoneLocation_2024_08_13'
              title: Phone
            - $ref: >-
                #/components/schemas/BookingInputOrganizersDefaultAppLocation_2024_08_13
              title: Organizer Default App
        metadata:
          type: object
          additionalProperties:
            type: string
          description: >-
            You can store any additional data you want here. Metadata must have
            at most 50 keys, each key up to 40 characters, and string values up
            to 500 characters.
          example:
            key: value
        lengthInMinutes:
          type: number
          minimum: 1
          example: 30
          description: >-
            If it is an event type that has multiple possible lengths that
            attendee can pick from, you can pass the desired booking length
            here.
                If not provided then event type default length will be used for the booking.
        routing:
          description: >-
            Routing information from routing forms that determined the booking
            assignment. Both responseId and teamMemberIds are required if
            provided.
          example:
            responseId: 123
            teamMemberIds:
              - 101
              - 102
          allOf:
            - $ref: '#/components/schemas/Routing'
        emailVerificationCode:
          type: string
          description: >-
            Email verification code required when event type has email
            verification enabled.
          example: '123456'
        allowConflicts:
          type: boolean
          description: >-
            When true, availability conflict checks are bypassed for an
            authenticated user who has access through the existing event owner,
            host, assigned user, team admin or organization admin checks. Team-
            and organization-scoped keys are restricted to events in their
            stored team or organization. Otherwise this parameter is silently
            ignored. Only supported on the 2026-02-25 and 2026-05-01 API
            versions.
          example: true
        allowBookingOutOfBounds:
          type: boolean
          description: >-
            When true, booking time out-of-bounds checks are bypassed, allowing
            bookings outside the normally permitted scheduling window, for an
            authenticated user who has access through the existing event owner,
            host, assigned user, team admin or organization admin checks. Team-
            and organization-scoped keys are restricted to events in their
            stored team or organization. Otherwise this parameter is silently
            ignored. Only supported on the 2026-02-25 and 2026-05-01 API
            versions.
          example: true
        skipBookingLimits:
          type: boolean
          description: >-
            When true, booking limit checks (event type, team, and per-host
            count and duration limits) are bypassed for an authenticated user
            who has access through the existing event owner, host, assigned
            user, team admin or organization admin checks. Team- and
            organization-scoped keys are restricted to events in their stored
            team or organization. Otherwise this parameter is silently ignored.
            Only supported on the 2026-02-25 and 2026-05-01 API versions.
          example: true
      required:
        - start
        - attendee
    CreateInstantBookingInput_2024_08_13:
      type: object
      properties:
        start:
          type: string
          description: The start time of the booking in ISO 8601 format in UTC timezone.
          example: '2024-08-13T09:00:00Z'
          format: date-time
        attendee:
          description: The attendee's details.
          allOf:
            - $ref: '#/components/schemas/CreateBookingAttendee'
        bookingFieldsResponses:
          type: object
          additionalProperties: true
          description: >-
            Booking field responses consisting of an object with booking field
            slug as keys and user response as values for custom booking fields
            added by you.
          example:
            customField: customValue
        leadEnrichmentOptOut:
          type: boolean
          description: >-
            The booker's answer to the lead enrichment opt-out, for an event
            type with a workflow that looks bookers up with lead enrichment.
            Send `true` when the booker ticked the opt-out and `false` when they
            were shown it and left it unticked. Sending `false` asserts that the
            booker saw the opt-out. Leave it out when the booker was not shown
            it: a booking without an answer is never looked up.
          example: false
        eventTypeId:
          type: number
          description: >-
            The ID of the event type that is booked. Required unless
            eventTypeSlug and username are provided as an alternative to
            identifying the event type.
          example: 123
        eventTypeSlug:
          type: string
          description: >-
            The slug of the event type. Required along with username / teamSlug
            and optionally organizationSlug if eventTypeId is not provided.
          example: my-event-type
        username:
          type: string
          description: >-
            The username of the event owner. Required along with eventTypeSlug
            and optionally organizationSlug if eventTypeId is not provided.
          example: john-doe
        teamSlug:
          type: string
          description: >-
            Team slug for team that owns event type for which slots are fetched.
            Required along with eventTypeSlug and optionally organizationSlug if
            the team is part of organization
          example: john-doe
        organizationSlug:
          type: string
          description: >-
            The organization slug. Optional, only used when booking with
            eventTypeSlug + username or eventTypeSlug + teamSlug.
          example: acme-corp
        guests:
          description: An optional list of guest emails attending the event.
          example:
            - guest1@example.com
            - guest2@example.com
          type: array
          items:
            type: string
        meetingUrl:
          type: string
          format: uri
          description: >-
            Deprecated - use 'location' instead. Meeting URL just for this
            booking. Displayed in email and calendar event. If not provided then
            cal video link will be generated.
          example: https://example.com/meeting
          deprecated: true
        location:
          description: >-
            One of the event type locations. If instead of passing one of the
            location objects as required by schema you are still passing a
            string please use an object.
          oneOf:
            - $ref: '#/components/schemas/BookingInputAddressLocation_2024_08_13'
              title: Address
            - $ref: >-
                #/components/schemas/BookingInputAttendeeAddressLocation_2024_08_13
              title: Attendee Address
            - $ref: >-
                #/components/schemas/BookingInputAttendeeDefinedLocation_2024_08_13
              title: Attendee Defined
            - $ref: >-
                #/components/schemas/BookingInputAttendeePhoneLocation_2024_08_13
              title: Attendee Phone
            - $ref: '#/components/schemas/BookingInputIntegrationLocation_2024_08_13'
              title: Integration
            - $ref: '#/components/schemas/BookingInputLinkLocation_2024_08_13'
              title: Link
            - $ref: '#/components/schemas/BookingInputPhoneLocation_2024_08_13'
              title: Phone
            - $ref: >-
                #/components/schemas/BookingInputOrganizersDefaultAppLocation_2024_08_13
              title: Organizer Default App
        metadata:
          type: object
          additionalProperties:
            type: string
          description: >-
            You can store any additional data you want here. Metadata must have
            at most 50 keys, each key up to 40 characters, and string values up
            to 500 characters.
          example:
            key: value
        lengthInMinutes:
          type: number
          minimum: 1
          example: 30
          description: >-
            If it is an event type that has multiple possible lengths that
            attendee can pick from, you can pass the desired booking length
            here.
                If not provided then event type default length will be used for the booking.
        routing:
          description: >-
            Routing information from routing forms that determined the booking
            assignment. Both responseId and teamMemberIds are required if
            provided.
          example:
            responseId: 123
            teamMemberIds:
              - 101
              - 102
          allOf:
            - $ref: '#/components/schemas/Routing'
        emailVerificationCode:
          type: string
          description: >-
            Email verification code required when event type has email
            verification enabled.
          example: '123456'
        allowConflicts:
          type: boolean
          description: >-
            When true, availability conflict checks are bypassed for an
            authenticated user who has access through the existing event owner,
            host, assigned user, team admin or organization admin checks. Team-
            and organization-scoped keys are restricted to events in their
            stored team or organization. Otherwise this parameter is silently
            ignored. Only supported on the 2026-02-25 and 2026-05-01 API
            versions.
          example: true
        allowBookingOutOfBounds:
          type: boolean
          description: >-
            When true, booking time out-of-bounds checks are bypassed, allowing
            bookings outside the normally permitted scheduling window, for an
            authenticated user who has access through the existing event owner,
            host, assigned user, team admin or organization admin checks. Team-
            and organization-scoped keys are restricted to events in their
            stored team or organization. Otherwise this parameter is silently
            ignored. Only supported on the 2026-02-25 and 2026-05-01 API
            versions.
          example: true
        skipBookingLimits:
          type: boolean
          description: >-
            When true, booking limit checks (event type, team, and per-host
            count and duration limits) are bypassed for an authenticated user
            who has access through the existing event owner, host, assigned
            user, team admin or organization admin checks. Team- and
            organization-scoped keys are restricted to events in their stored
            team or organization. Otherwise this parameter is silently ignored.
            Only supported on the 2026-02-25 and 2026-05-01 API versions.
          example: true
        instant:
          type: boolean
          description: >-
            Flag indicating if the booking is an instant booking. Only available
            for team events.
          example: true
      required:
        - start
        - attendee
        - instant
    CreateRecurringBookingInput_2024_08_13:
      type: object
      properties:
        start:
          type: string
          description: The start time of the booking in ISO 8601 format in UTC timezone.
          example: '2024-08-13T09:00:00Z'
          format: date-time
        attendee:
          description: The attendee's details.
          allOf:
            - $ref: '#/components/schemas/CreateBookingAttendee'
        bookingFieldsResponses:
          type: object
          additionalProperties: true
          description: >-
            Booking field responses consisting of an object with booking field
            slug as keys and user response as values for custom booking fields
            added by you.
          example:
            customField: customValue
        leadEnrichmentOptOut:
          type: boolean
          description: >-
            The booker's answer to the lead enrichment opt-out, for an event
            type with a workflow that looks bookers up with lead enrichment.
            Send `true` when the booker ticked the opt-out and `false` when they
            were shown it and left it unticked. Sending `false` asserts that the
            booker saw the opt-out. Leave it out when the booker was not shown
            it: a booking without an answer is never looked up.
          example: false
        eventTypeId:
          type: number
          description: >-
            The ID of the event type that is booked. Required unless
            eventTypeSlug and username are provided as an alternative to
            identifying the event type.
          example: 123
        eventTypeSlug:
          type: string
          description: >-
            The slug of the event type. Required along with username / teamSlug
            and optionally organizationSlug if eventTypeId is not provided.
          example: my-event-type
        username:
          type: string
          description: >-
            The username of the event owner. Required along with eventTypeSlug
            and optionally organizationSlug if eventTypeId is not provided.
          example: john-doe
        teamSlug:
          type: string
          description: >-
            Team slug for team that owns event type for which slots are fetched.
            Required along with eventTypeSlug and optionally organizationSlug if
            the team is part of organization
          example: john-doe
        organizationSlug:
          type: string
          description: >-
            The organization slug. Optional, only used when booking with
            eventTypeSlug + username or eventTypeSlug + teamSlug.
          example: acme-corp
        guests:
          description: An optional list of guest emails attending the event.
          example:
            - guest1@example.com
            - guest2@example.com
          type: array
          items:
            type: string
        meetingUrl:
          type: string
          format: uri
          description: >-
            Deprecated - use 'location' instead. Meeting URL just for this
            booking. Displayed in email and calendar event. If not provided then
            cal video link will be generated.
          example: https://example.com/meeting
          deprecated: true
        location:
          description: >-
            One of the event type locations. If instead of passing one of the
            location objects as required by schema you are still passing a
            string please use an object.
          oneOf:
            - $ref: '#/components/schemas/BookingInputAddressLocation_2024_08_13'
              title: Address
            - $ref: >-
                #/components/schemas/BookingInputAttendeeAddressLocation_2024_08_13
              title: Attendee Address
            - $ref: >-
                #/components/schemas/BookingInputAttendeeDefinedLocation_2024_08_13
              title: Attendee Defined
            - $ref: >-
                #/components/schemas/BookingInputAttendeePhoneLocation_2024_08_13
              title: Attendee Phone
            - $ref: '#/components/schemas/BookingInputIntegrationLocation_2024_08_13'
              title: Integration
            - $ref: '#/components/schemas/BookingInputLinkLocation_2024_08_13'
              title: Link
            - $ref: '#/components/schemas/BookingInputPhoneLocation_2024_08_13'
              title: Phone
            - $ref: >-
                #/components/schemas/BookingInputOrganizersDefaultAppLocation_2024_08_13
              title: Organizer Default App
        metadata:
          type: object
          additionalProperties:
            type: string
          description: >-
            You can store any additional data you want here. Metadata must have
            at most 50 keys, each key up to 40 characters, and string values up
            to 500 characters.
          example:
            key: value
        lengthInMinutes:
          type: number
          minimum: 1
          example: 30
          description: >-
            If it is an event type that has multiple possible lengths that
            attendee can pick from, you can pass the desired booking length
            here.
                If not provided then event type default length will be used for the booking.
        routing:
          description: >-
            Routing information from routing forms that determined the booking
            assignment. Both responseId and teamMemberIds are required if
            provided.
          example:
            responseId: 123
            teamMemberIds:
              - 101
              - 102
          allOf:
            - $ref: '#/components/schemas/Routing'
        emailVerificationCode:
          type: string
          description: >-
            Email verification code required when event type has email
            verification enabled.
          example: '123456'
        allowConflicts:
          type: boolean
          description: >-
            When true, availability conflict checks are bypassed for an
            authenticated user who has access through the existing event owner,
            host, assigned user, team admin or organization admin checks. Team-
            and organization-scoped keys are restricted to events in their
            stored team or organization. Otherwise this parameter is silently
            ignored. Only supported on the 2026-02-25 and 2026-05-01 API
            versions.
          example: true
        allowBookingOutOfBounds:
          type: boolean
          description: >-
            When true, booking time out-of-bounds checks are bypassed, allowing
            bookings outside the normally permitted scheduling window, for an
            authenticated user who has access through the existing event owner,
            host, assigned user, team admin or organization admin checks. Team-
            and organization-scoped keys are restricted to events in their
            stored team or organization. Otherwise this parameter is silently
            ignored. Only supported on the 2026-02-25 and 2026-05-01 API
            versions.
          example: true
        skipBookingLimits:
          type: boolean
          description: >-
            When true, booking limit checks (event type, team, and per-host
            count and duration limits) are bypassed for an authenticated user
            who has access through the existing event owner, host, assigned
            user, team admin or organization admin checks. Team- and
            organization-scoped keys are restricted to events in their stored
            team or organization. Otherwise this parameter is silently ignored.
            Only supported on the 2026-02-25 and 2026-05-01 API versions.
          example: true
        recurrenceCount:
          type: number
          minimum: 1
          description: >-
            The number of recurrences. If not provided then event type
            recurrence count will be used. Can't be more than
                event type recurrence count
          example: 5
          maximum: 32
      required:
        - start
        - attendee
    CreateBookingOutput_2024_08_13:
      type: object
      properties:
        status:
          enum:
            - success
            - error
          type: string
          example: success
        data:
          oneOf:
            - $ref: '#/components/schemas/BookingOutput_2024_08_13'
              title: Booking
            - title: Recurring Bookings (array)
              type: array
              items:
                $ref: '#/components/schemas/RecurringBookingOutput_2024_08_13'
            - $ref: '#/components/schemas/CreateSeatedBookingOutput_2024_08_13'
              title: Seated Booking
            - title: Recurring Seated Bookings (array)
              type: array
              items:
                $ref: >-
                  #/components/schemas/CreateRecurringSeatedBookingOutput_2024_08_13
          description: >-
            Booking data, which can be either a BookingOutput object or an array
            of RecurringBookingOutput objects
      required:
        - status
        - data
    CreateBookingAttendee:
      type: object
      properties:
        name:
          type: string
          description: The name of the attendee.
          example: John Doe
        timeZone:
          type: string
          description: The time zone of the attendee.
          example: America/New_York
        phoneNumber:
          type: string
          description: The phone number of the attendee in international format.
          example: '+919876543210'
        language:
          enum:
            - ar
            - ca
            - de
            - es
            - eu
            - he
            - id
            - ja
            - lv
            - pl
            - ro
            - sr
            - th
            - vi
            - az
            - cs
            - el
            - es-419
            - fi
            - hr
            - it
            - km
            - nl
            - pt
            - ru
            - sv
            - tr
            - zh-CN
            - bg
            - da
            - en
            - et
            - fr
            - hu
            - iw
            - ko
            - 'no'
            - pt-BR
            - sk
            - sl
            - ta
            - uk
            - zh-TW
            - bn
          type: string
          description: >-
            The preferred language of the attendee. Used for booking
            confirmation.
          example: it
          default: en
        email:
          type: string
          description: The email of the attendee.
          example: john.doe@example.com
      required:
        - name
        - timeZone
    BookingInputAddressLocation_2024_08_13:
      type: object
      properties:
        type:
          type: string
          example: address
          description: >-
            only allowed value for type is `address` - it refers to address
            defined by the organizer.
      required:
        - type
    BookingInputAttendeeAddressLocation_2024_08_13:
      type: object
      properties:
        type:
          type: string
          example: attendeeAddress
          description: only allowed value for type is `attendeeAddress`
        address:
          type: string
          minLength: 1
          example: 123 Example St, City, Country
      required:
        - type
        - address
    BookingInputAttendeeDefinedLocation_2024_08_13:
      type: object
      properties:
        type:
          type: string
          example: attendeeDefined
          description: only allowed value for type is `attendeeDefined`
        location:
          type: string
          minLength: 1
          example: 321 Example St, City, Country
      required:
        - type
        - location
    BookingInputAttendeePhoneLocation_2024_08_13:
      type: object
      properties:
        type:
          type: string
          example: attendeePhone
          description: only allowed value for type is `attendeePhone`
        phone:
          type: string
          example: '+37120993151'
      required:
        - type
        - phone
    BookingInputIntegrationLocation_2024_08_13:
      type: object
      properties:
        type:
          type: string
          example: integration
          description: only allowed value for type is `integration`
        integration:
          enum:
            - cal-video
            - google-meet
            - zoom
            - whereby-video
            - whatsapp-video
            - webex-video
            - telegram-video
            - tandem
            - sylaps-video
            - skype-video
            - sirius-video
            - signal-video
            - shimmer-video
            - salesroom-video
            - roam-video
            - riverside-video
            - ping-video
            - office365-video
            - mirotalk-video
            - jitsi
            - jelly-video
            - jelly-conferencing
            - huddle
            - facetime-video
            - element-call-video
            - eightxeight-video
            - discord-video
            - demodesk-video
            - campfire-video
          type: string
          example: cal-video
      required:
        - type
        - integration
    BookingInputLinkLocation_2024_08_13:
      type: object
      properties:
        type:
          type: string
          example: link
          description: >-
            only allowed value for type is `link` - it refers to link defined by
            the organizer.
      required:
        - type
    BookingInputPhoneLocation_2024_08_13:
      type: object
      properties:
        type:
          type: string
          example: phone
          description: >-
            only allowed value for type is `phone` - it refers to phone defined
            by the organizer.
      required:
        - type
    BookingInputOrganizersDefaultAppLocation_2024_08_13:
      type: object
      properties:
        type:
          type: string
          example: organizersDefaultApp
          description: >-
            only available for team event types and the only allowed value for
            type is `organizersDefaultApp` - it refers to the default app
            defined by the organizer.
      required:
        - type
    Routing:
      type: object
      properties:
        queuedResponseId:
          type: string
          nullable: true
          description: >-
            The ID of the queued form response. Only present if the form
            response was queued.
          example: '123'
        responseId:
          type: number
          nullable: true
          description: The ID of the routing form response.
          example: 123
        teamMemberIds:
          description: Array of team member IDs that were routed to handle this booking.
          example:
            - 101
            - 102
          type: array
          items:
            type: number
        teamMemberEmail:
          type: string
          description: The email of the team member assigned to handle this booking.
          example: john.doe@example.com
        skipContactOwner:
          type: boolean
          description: Whether to skip contact owner assignment from CRM integration.
          example: true
        crmAppSlug:
          type: string
          description: The CRM application slug for integration.
          example: salesforce
        crmOwnerRecordType:
          type: string
          description: The CRM owner record type for contact assignment.
          example: Account
        crmRecordOwnerFallbackTeamMemberIds:
          description: >-
            Eligible CRM owner fallback team member IDs to pass to the booking
            API.
          example:
            - 103
            - 104
          type: array
          items:
            type: number
        crmRecordOwnerFallbackMode:
          enum:
            - relationship
            - attributeRules
          type: string
          description: The CRM owner fallback strategy used for this routing result.
          example: relationship
      required:
        - teamMemberIds
    BookingOutput_2024_08_13:
      type: object
      properties:
        id:
          type: number
          example: 123
        uid:
          type: string
          example: booking_uid_123
        title:
          type: string
          example: Consultation
        description:
          type: string
          example: Learn how to integrate scheduling into marketplace.
        hosts:
          type: array
          items:
            $ref: '#/components/schemas/BookingHost'
        status:
          enum:
            - cancelled
            - accepted
            - rejected
            - pending
            - awaiting_host
          type: string
          example: accepted
          description: >-
            `awaiting_host` is an instant meeting that is live and waiting for a
            host to join.
        cancellationReason:
          type: string
          example: User requested cancellation
        cancelledByEmail:
          type: string
          format: email
          example: canceller@example.com
        reschedulingReason:
          type: string
          example: User rescheduled the event
        rescheduledByEmail:
          type: string
          format: email
          example: rescheduler@example.com
        rescheduledFromUid:
          type: string
          example: previous_uid_123
          description: UID of the previous booking from which this booking was rescheduled.
        rescheduledToUid:
          type: string
          example: new_uid_456
          description: UID of the new booking to which this booking was rescheduled.
        start:
          type: string
          example: '2024-08-13T15:30:00Z'
          format: date-time
        end:
          type: string
          example: '2024-08-13T16:30:00Z'
          format: date-time
        duration:
          type: number
          example: 60
        eventTypeId:
          type: number
          example: 50
          deprecated: true
          description: Deprecated - rely on 'eventType' object containing the id instead.
        eventType:
          $ref: '#/components/schemas/EventType'
        meetingUrl:
          type: string
          format: uri
          description: Deprecated - rely on 'location' field instead.
          example: https://example.com/recurring-meeting
          deprecated: true
        location:
          type: string
          example: https://example.com/meeting
        absentHost:
          type: boolean
          example: true
        createdAt:
          type: string
          example: '2024-08-13T15:30:00Z'
          format: date-time
        updatedAt:
          type: string
          nullable: true
          example: '2024-08-13T15:30:00Z'
          format: date-time
        metadata:
          type: object
          additionalProperties:
            type: string
          example:
            key: value
        rating:
          type: number
          example: 4
        icsUid:
          type: string
          example: ics_uid_123
          description: UID of ICS event.
        attendees:
          type: array
          items:
            $ref: '#/components/schemas/BookingAttendee'
        guests:
          example:
            - guest1@example.com
            - guest2@example.com
          type: array
          items:
            type: string
        bookingFieldsResponses:
          type: object
          additionalProperties: true
          description: >-
            Booking field responses consisting of an object with booking field
            slug as keys and user response as values.
          example:
            customField: customValue
      required:
        - id
        - uid
        - title
        - description
        - hosts
        - status
        - start
        - end
        - duration
        - eventTypeId
        - eventType
        - location
        - absentHost
        - createdAt
        - updatedAt
        - attendees
        - bookingFieldsResponses
    RecurringBookingOutput_2024_08_13:
      type: object
      properties:
        id:
          type: number
          example: 123
        uid:
          type: string
          example: booking_uid_123
        title:
          type: string
          example: Consultation
        description:
          type: string
          example: Learn how to integrate scheduling into marketplace.
        hosts:
          type: array
          items:
            $ref: '#/components/schemas/BookingHost'
        status:
          enum:
            - cancelled
            - accepted
            - rejected
            - pending
            - awaiting_host
          type: string
          example: accepted
          description: >-
            `awaiting_host` is an instant meeting that is live and waiting for a
            host to join.
        cancellationReason:
          type: string
          example: User requested cancellation
        cancelledByEmail:
          type: string
          format: email
          example: canceller@example.com
        reschedulingReason:
          type: string
          example: User rescheduled the event
        rescheduledByEmail:
          type: string
          format: email
          example: rescheduler@example.com
        rescheduledFromUid:
          type: string
          example: previous_uid_123
          description: UID of the previous booking from which this booking was rescheduled.
        rescheduledToUid:
          type: string
          example: new_uid_456
          description: UID of the new booking to which this booking was rescheduled.
        start:
          type: string
          example: '2024-08-13T15:30:00Z'
          format: date-time
        end:
          type: string
          example: '2024-08-13T16:30:00Z'
          format: date-time
        duration:
          type: number
          example: 60
        eventTypeId:
          type: number
          example: 50
          deprecated: true
          description: Deprecated - rely on 'eventType' object containing the id instead.
        eventType:
          $ref: '#/components/schemas/EventType'
        meetingUrl:
          type: string
          format: uri
          description: Deprecated - rely on 'location' field instead.
          example: https://example.com/recurring-meeting
          deprecated: true
        location:
          type: string
          example: https://example.com/meeting
        absentHost:
          type: boolean
          example: true
        createdAt:
          type: string
          example: '2024-08-13T15:30:00Z'
          format: date-time
        updatedAt:
          type: string
          nullable: true
          example: '2024-08-13T15:30:00Z'
          format: date-time
        metadata:
          type: object
          additionalProperties:
            type: string
          example:
            key: value
        rating:
          type: number
          example: 4
        icsUid:
          type: string
          example: ics_uid_123
          description: UID of ICS event.
        attendees:
          type: array
          items:
            $ref: '#/components/schemas/BookingAttendee'
        guests:
          example:
            - guest1@example.com
            - guest2@example.com
          type: array
          items:
            type: string
        bookingFieldsResponses:
          type: object
          additionalProperties: true
          description: >-
            Booking field responses consisting of an object with booking field
            slug as keys and user response as values.
          example:
            customField: customValue
        recurringBookingUid:
          type: string
          example: recurring_uid_987
      required:
        - id
        - uid
        - title
        - description
        - hosts
        - status
        - start
        - end
        - duration
        - eventTypeId
        - eventType
        - location
        - absentHost
        - createdAt
        - updatedAt
        - attendees
        - bookingFieldsResponses
        - recurringBookingUid
    CreateSeatedBookingOutput_2024_08_13:
      type: object
      properties:
        id:
          type: number
          example: 123
        uid:
          type: string
          example: booking_uid_123
        title:
          type: string
          example: Consultation
        description:
          type: string
          example: Learn how to integrate scheduling into marketplace.
        hosts:
          type: array
          items:
            $ref: '#/components/schemas/BookingHost'
        status:
          enum:
            - cancelled
            - accepted
            - rejected
            - pending
            - awaiting_host
          type: string
          example: accepted
          description: >-
            `awaiting_host` is an instant meeting that is live and waiting for a
            host to join.
        cancellationReason:
          type: string
          example: User requested cancellation
        cancelledByEmail:
          type: string
          format: email
          example: canceller@example.com
        reschedulingReason:
          type: string
          example: User rescheduled the event
        rescheduledByEmail:
          type: string
          format: email
          example: rescheduler@example.com
        rescheduledFromUid:
          type: string
          example: previous_uid_123
          description: UID of the previous booking from which this booking was rescheduled.
        rescheduledToUid:
          type: string
          example: new_uid_456
          description: UID of the new booking to which this booking was rescheduled.
        start:
          type: string
          example: '2024-08-13T15:30:00Z'
          format: date-time
        end:
          type: string
          example: '2024-08-13T16:30:00Z'
          format: date-time
        duration:
          type: number
          example: 60
        eventTypeId:
          type: number
          example: 50
          deprecated: true
          description: Deprecated - rely on 'eventType' object containing the id instead.
        eventType:
          $ref: '#/components/schemas/EventType'
        meetingUrl:
          type: string
          format: uri
          description: Deprecated - rely on 'location' field instead.
          example: https://example.com/recurring-meeting
          deprecated: true
        location:
          type: string
          example: https://example.com/meeting
        absentHost:
          type: boolean
          example: true
        createdAt:
          type: string
          example: '2024-08-13T15:30:00Z'
          format: date-time
        updatedAt:
          type: string
          nullable: true
          example: '2024-08-13T15:30:00Z'
          format: date-time
        metadata:
          type: object
          additionalProperties:
            type: string
          example:
            key: value
        rating:
          type: number
          example: 4
        icsUid:
          type: string
          example: ics_uid_123
          description: UID of ICS event.
        seatUid:
          type: string
          example: 3be561a9-31f1-4b8e-aefc-9d9a085f0dd1
        attendees:
          type: array
          items:
            $ref: '#/components/schemas/SeatedAttendee'
      required:
        - id
        - uid
        - title
        - description
        - hosts
        - status
        - start
        - end
        - duration
        - eventTypeId
        - eventType
        - location
        - absentHost
        - createdAt
        - updatedAt
        - seatUid
        - attendees
    CreateRecurringSeatedBookingOutput_2024_08_13:
      type: object
      properties:
        id:
          type: number
          example: 123
        uid:
          type: string
          example: booking_uid_123
        title:
          type: string
          example: Consultation
        description:
          type: string
          example: Learn how to integrate scheduling into marketplace.
        hosts:
          type: array
          items:
            $ref: '#/components/schemas/BookingHost'
        status:
          enum:
            - cancelled
            - accepted
            - rejected
            - pending
            - awaiting_host
          type: string
          example: accepted
          description: >-
            `awaiting_host` is an instant meeting that is live and waiting for a
            host to join.
        cancellationReason:
          type: string
          example: User requested cancellation
        cancelledByEmail:
          type: string
          format: email
          example: canceller@example.com
        reschedulingReason:
          type: string
          example: User rescheduled the event
        rescheduledByEmail:
          type: string
          format: email
          example: rescheduler@example.com
        rescheduledFromUid:
          type: string
          example: previous_uid_123
          description: UID of the previous booking from which this booking was rescheduled.
        rescheduledToUid:
          type: string
          example: new_uid_456
          description: UID of the new booking to which this booking was rescheduled.
        start:
          type: string
          example: '2024-08-13T15:30:00Z'
          format: date-time
        end:
          type: string
          example: '2024-08-13T16:30:00Z'
          format: date-time
        duration:
          type: number
          example: 60
        eventTypeId:
          type: number
          example: 50
          deprecated: true
          description: Deprecated - rely on 'eventType' object containing the id instead.
        eventType:
          $ref: '#/components/schemas/EventType'
        meetingUrl:
          type: string
          format: uri
          description: Deprecated - rely on 'location' field instead.
          example: https://example.com/recurring-meeting
          deprecated: true
        location:
          type: string
          example: https://example.com/meeting
        absentHost:
          type: boolean
          example: true
        createdAt:
          type: string
          example: '2024-08-13T15:30:00Z'
          format: date-time
        updatedAt:
          type: string
          nullable: true
          example: '2024-08-13T15:30:00Z'
          format: date-time
        metadata:
          type: object
          additionalProperties:
            type: string
          example:
            key: value
        rating:
          type: number
          example: 4
        icsUid:
          type: string
          example: ics_uid_123
          description: UID of ICS event.
        seatUid:
          type: string
          example: 3be561a9-31f1-4b8e-aefc-9d9a085f0dd1
        attendees:
          type: array
          items:
            $ref: '#/components/schemas/SeatedAttendee'
        recurringBookingUid:
          type: string
          example: recurring_uid_987
      required:
        - id
        - uid
        - title
        - description
        - hosts
        - status
        - start
        - end
        - duration
        - eventTypeId
        - eventType
        - location
        - absentHost
        - createdAt
        - updatedAt
        - seatUid
        - attendees
        - recurringBookingUid
    BookingHost:
      type: object
      properties:
        id:
          type: number
          example: 1
        name:
          type: string
          example: Jane Doe
        email:
          type: string
          example: jane100@example.com
        displayEmail:
          type: string
          example: jane100@example.com
          description: Clean email for display purposes
        username:
          type: string
          example: jane100
        timeZone:
          type: string
          example: America/Los_Angeles
      required:
        - id
        - name
        - email
        - displayEmail
        - username
        - timeZone
    EventType:
      type: object
      properties:
        id:
          type: number
          example: 1
        slug:
          type: string
          example: some-event
      required:
        - id
        - slug
    BookingAttendee:
      type: object
      properties:
        name:
          type: string
          example: John Doe
        email:
          type: string
          example: john@example.com
        displayEmail:
          type: string
          example: john@example.com
          description: Clean email for display purposes
        timeZone:
          type: string
          example: America/New_York
        language:
          enum:
            - ar
            - ca
            - de
            - es
            - eu
            - he
            - id
            - ja
            - lv
            - pl
            - ro
            - sr
            - th
            - vi
            - az
            - cs
            - el
            - es-419
            - fi
            - hr
            - it
            - km
            - nl
            - pt
            - ru
            - sv
            - tr
            - zh-CN
            - bg
            - da
            - en
            - et
            - fr
            - hu
            - iw
            - ko
            - 'no'
            - pt-BR
            - sk
            - sl
            - ta
            - uk
            - zh-TW
            - bn
          type: string
          example: en
        absent:
          type: boolean
          example: false
        phoneNumber:
          type: string
          example: '+1234567890'
      required:
        - name
        - email
        - displayEmail
        - timeZone
        - absent
    SeatedAttendee:
      type: object
      properties:
        name:
          type: string
          example: John Doe
        email:
          type: string
          example: john@example.com
        displayEmail:
          type: string
          example: john@example.com
          description: Clean email for display purposes
        timeZone:
          type: string
          example: America/New_York
        language:
          enum:
            - ar
            - ca
            - de
            - es
            - eu
            - he
            - id
            - ja
            - lv
            - pl
            - ro
            - sr
            - th
            - vi
            - az
            - cs
            - el
            - es-419
            - fi
            - hr
            - it
            - km
            - nl
            - pt
            - ru
            - sv
            - tr
            - zh-CN
            - bg
            - da
            - en
            - et
            - fr
            - hu
            - iw
            - ko
            - 'no'
            - pt-BR
            - sk
            - sl
            - ta
            - uk
            - zh-TW
            - bn
          type: string
          example: en
        absent:
          type: boolean
          example: false
        phoneNumber:
          type: string
          example: '+1234567890'
        seatUid:
          type: string
          example: 3be561a9-31f1-4b8e-aefc-9d9a085f0dd1
        createdAt:
          type: string
          example: '2024-08-13T15:30:00Z'
          description: The date and time when the attendee joined the seated booking.
        bookingFieldsResponses:
          type: object
          additionalProperties: true
          description: >-
            Booking field responses consisting of an object with booking field
            slug as keys and user response as values.
          example:
            customField: customValue
        metadata:
          type: object
          additionalProperties:
            type: string
          example:
            key: value
        status:
          type: string
          enum:
            - cancelled
          example: cancelled
          description: >-
            Present on API version 2026-02-25 and later when this attendee was
            loaded from a cancelled seat. Omitted for occupied seats.
      required:
        - name
        - email
        - displayEmail
        - timeZone
        - absent
        - seatUid
        - bookingFieldsResponses

````