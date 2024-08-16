import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'
import { adminsOrPublished } from '../../access/adminsOrPublished'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import adminsAndUser from '../Users/access/adminsAndUser'
import { checkRole } from '../Users/checkRole'

const anyone = () => true
export const Students: CollectionConfig = {
  slug: 'students',
  auth: true,
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
      name: 'phoneNumber',
      label: 'Phone Number',
      type: 'text',
      required: true,
    },
    {
      name: 'dateOfBirth',
      label: 'Date of Birth',
      type: 'date',
    },
    {
      name: 'enrollmentDate',
      label: 'Enrollment Date',
      type: 'date',
    },
    {
      name: 'gender',
      label: 'Gender',
      type: 'select',
      options: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'assignedTutor',
      label: 'Assigned Tutor',
      type: 'relationship',
      relationTo: 'tutors',
      hasMany: true,
    },
    {
      name: 'address',
      label: 'Address',
      type: 'text',
    },
    {
      name: 'city',
      label: 'City',
      type: 'text',
    },
    {
      name: 'state',
      label: 'State',
      type: 'text',
    },
    {
      name: 'zipCode',
      label: 'Zip Code',
      type: 'text',
    },
    {
      name: 'country',
      label: 'Country',
      type: 'text',
    },
    {
      name: 'profilePicture',
      label: 'Profile Picture',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
