import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: '../snippet-library-nest-api/src/schema.gql',
    documents: ['src/app/snippets/graphql/snippet-*.ts'],
    generates: {
        'src/app/snippets/graphql/generated.ts': {
            plugins: ['typescript-operations'],
            config: {
                scalars: {
                    DateTime: 'string',
                },
            },
        },
    },
};

export default config