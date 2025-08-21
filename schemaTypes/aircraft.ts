import {defineType, defineField} from 'sanity';

export default defineType({
  name: 'aircraft',
  title: 'Aircraft',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: r => r.required() }),
    defineField({
      name: 'slug', type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: r => r.required(),
    }),
    defineField({
      name: 'heroImage', type: 'image', title: 'Hero Image',
      options: { hotspot: true }, validation: r => r.required(),
    }),

    // numeric hero stats
    defineField({
      name: 'heroStats', title: 'Hero Stats', type: 'object',
      fields: [
        defineField({ name: 'noOfPassengers', title: 'Number of Passengers', type: 'number', validation: r => r.required().integer().positive() }),
        defineField({ name: 'maxRangeNm', title: 'Maximum Range (NM)', type: 'number', validation: r => r.required().integer().positive() }),
        defineField({ name: 'maxFlightHours', title: 'Maximum Flight Time (hours)', type: 'number', validation: r => r.required().positive() }),
      ],
      validation: r => r.required(),
    }),

    defineField({
      name: 'gallery', title: 'Gallery', type: 'object',
      fields: [
        defineField({ name: 'leftTall', title: 'Left Tall Image', type: 'image', options: {hotspot: true}, validation: r => r.required() }),
        defineField({ name: 'rightTop', title: 'Right Top Image', type: 'image', options: {hotspot: true}, validation: r => r.required() }),
      ],
      validation: r => r.required(),
    }),

    defineField({
      name: 'specsExtra', title: 'Specifications (Extra)', type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'key', title: 'Spec Key', type: 'string',
            options: {
              list: [
                { title: 'Baggage Capacity (ft³)', value: 'baggageCapacityFt3' },
                { title: 'Speed (knots)', value: 'speedKnots' },
                { title: 'Cruising Altitude (ft)', value: 'cruisingAltitudeFt' },
              ],
            },
            validation: r => r.required(),
          }),
          defineField({ name: 'value', title: 'Numeric Value', type: 'number', validation: r => r.required().positive() }),
        ],
        preview: { select: { title: 'key', subtitle: 'value' } },
      }],
    }),

    // ✅ SEO required; image optional
    defineField({
      name: 'seo', title: 'SEO', type: 'object',
      fields: [
        defineField({ name: 'title', type: 'string', validation: r => r.required() }),
        defineField({ name: 'description', type: 'text', validation: r => r.required() }),
        defineField({ name: 'image', type: 'image', options: { hotspot: true } }), // optional
      ],
      validation: r => r.required(),
    }),
  ],
  preview: { select: { title: 'name', media: 'heroImage' } },
});
