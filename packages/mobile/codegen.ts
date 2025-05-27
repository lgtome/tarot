import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: '../backend/src/schema.gql',
  documents: ['src/**/*.{ts,tsx,graphql}', 'src/graphql/**/*.{ts,tsx,graphql}'],
  generates: {
    './src/graphql/generated.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      config: {
        withHooks: true,
        withComponent: false,
        withHOC: false,
        withMutationFn: true,
        apolloReactHooksImportFrom: '@apollo/client',
        skipTypename: false,
        declarationKind: 'interface',
      },
    },
  },
  ignoreNoDocuments: true,
}

export default config
