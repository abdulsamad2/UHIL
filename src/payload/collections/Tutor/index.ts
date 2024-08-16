import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'
import { adminsOrPublished } from '../../access/adminsOrPublished'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import adminsAndUser from '../Users/access/adminsAndUser'
import { checkRole } from '../Users/checkRole'
const anyone = () => true

export const Tutors: CollectionConfig = {
  slug: 'tutors',
  auth: {
    tokenExpiration: 7200, // How many seconds to keep the user logged in
    verify: true, // Require email verification before being allowed to authenticate
    maxLoginAttempts: 5, // Automatically lock a user out after X amount of failed logins
    lockTime: 600 * 1000, // Time period to allow the max login attempts
    // More options are available
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'updatedAt'],
    preview: doc => {
      return `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/next/preview?url=${encodeURIComponent(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/tutors/${doc?.slug}`,
      )}&secret=${process.env.PAYLOAD_PUBLIC_DRAFT_SECRET}`
    },
  },

  access: {
    read: adminsOrPublished,
    create: anyone,
    update: adminsAndUser,
    delete: admins,
    admin: ({ req: { user } }) => checkRole(['admin'], user),
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'updatedAt'],
    preview: doc => {
      return `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/next/preview?url=${encodeURIComponent(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/tutors/${doc?.slug}`,
      )}&secret=${process.env.PAYLOAD_PUBLIC_DRAFT_SECRET}`
    },
  },
  hooks: {
    beforeChange: [populatePublishedAt],
  },
  versions: {
    drafts: true,
  },

  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      label: 'Phone',
      type: 'text',
      required: true,
    },
    {
      name: 'age',
      label: 'Age',
      type: 'number',
    },
    {
      name: 'address',
      label: 'Address',
      type: 'text',
    },
    {
      name: 'bank',
      label: 'Bank',
      type: 'text',
    },
    {
      name: 'accountNumber',
      label: 'Account Number',
      type: 'text',
    },

    {
      name: 'bio',
      type: 'textarea',
    },
    {
      name: 'experience',
      type: 'textarea',
    },
    {
      name: 'education',
      type: 'text',
    },
    {
      name: 'currentPosition',
      type: 'text',
    },
    {
      name: 'state',
      type: 'text',
    },
    {
      name: 'city',
      type: 'text',
    },
    {
      name: 'onlineTeaching',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'profilePicture',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'NRIC',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'Resume',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'STT',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'ARF',
      type: 'upload',
      relationTo: 'media',
    },

    {
      name: 'workingPositionNow',
      label: 'Working Position Now',
      type: 'text',
    },
    {
      name: 'levelOfEducation',
      label: 'Level of Education',
      type: 'text',
    },
    {
      name: 'nameOfHighestCertificate',
      label: 'Name of Highest Certificate',
      type: 'text',
    },
    {
      name: 'subjects',
      label: 'Subjects That You Can Teach',
      type: 'text',
    },
    {
      name: 'states',
      label: 'State You Can Teach',
      type: 'select',
      options: [
        { label: 'Kuala Lumpur', value: 'kuala_lumpur' },
        { label: 'Selangor', value: 'selangor' },
        { label: 'Pulau Pinang', value: 'pulau_pinang' },
        { label: 'Johor', value: 'johor' },
        { label: 'Perak', value: 'perak' },
        { label: 'Melaka', value: 'melaka' },
        { label: 'Negeri Sembilan', value: 'negeri_sembilan' },
        { label: 'Terengganu', value: 'terengganu' },
        { label: 'Kelantan', value: 'kelantan' },
        { label: 'Kedah', value: 'kedah' },
        { label: 'Perlis', value: 'perlis' },
        { label: 'Pahang', value: 'pahang' },
        { label: 'Sabah', value: 'sabah' },
        { label: 'Sarawak', value: 'sarawak' },
      ],
      hasMany: true,
    },
    {
      name: 'availability',
      label: 'Availability',
      type: 'array',

      fields: [
        {
          name: 'day',
          type: 'select',
          options: [
            { label: 'Monday', value: 'monday' },
            { label: 'Tuesday', value: 'tuesday' },
            { label: 'Wednesday', value: 'wednesday' },
            { label: 'Thursday', value: 'thursday' },
            { label: 'Friday', value: 'friday' },
            { label: 'Saturday', value: 'saturday' },
            { label: 'Sunday', value: 'sunday' },
          ],
        },
        {
          name: 'startTime',
          type: 'date',
          admin: {
            date: {
              pickerAppearance: 'timeOnly',
              displayFormat: 'h:mm:ss a',
            },
          },
        },
        {
          name: 'endTime',
          type: 'date',
          admin: {
            date: {
              pickerAppearance: 'timeOnly',
              displayFormat: 'h:mm:ss a',
            },
          },
        },
      ],
    },
  ],
}
