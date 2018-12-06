# lord-fakealot

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/a6989f4384e0440394870f22ad1c0f8f)](https://app.codacy.com/app/faebeee/lord-fakealot?utm_source=github.com&utm_medium=referral&utm_content=faebeee/lord-fakealot&utm_campaign=Badge_Grade_Dashboard)

`lord-fakealot` is a utility to generate mocked data based on typescript interfaces.
It loads all interfaces from a given directory and can either expose an HTTP api or
generate `json` files with mocked data in it

## Install
`npm i -g lord-fakealot`
This will then expose `fakealot` as a CLI entrypoint for this app

## Commands

### Help
Prints the help info to the CLI

```bash
fakealot -h
```


### Files Command
This commands create a jsonfile for every interface found in the `dir` directory. The name of each file
is the interfacename.

```bash
fakealot files --out ./out --dir ./test --tsconfig ./tsconfig.json
```

Create a directory `out` with files in it. 
Each file then contains directly the interface data like this:

__ComplexInterface.ts__
```typescript
export default interface ComplexInterface {
    type: string;
    
    /**
     * @minimum 2
     * @maximum 2
     */
    items: IItem[];
    
}

export interface IItem {
    name: string;
    
    /**
     * @minimum 0
     * @type integer
     */
    position: number;
}
```

___ComplexInterface.json___
```json
{
    "items": [
        {
            "name": "dolore in qui et",
            "position": 70112329
        },
        {
            "name": "tempor anim irure laborum",
            "position": 77636896
        }
    ],
    "type": "aute dolor id enim culpa"
}
```


### File Command
The `file` command will create a file, which stores a a collection with fake data for all interfaces found in the `dir`

The command

```bash
fakealot file --file ./mock.json --dir ./interfaces --tsconfig ./tsconfig.json
```

will create a new file name `mock.json`

with the content

```json
{
    "ComplexInterface": {
        "items": [
            {
                "name": "laboris ut",
                "position": 76655555
            },
            {
                "name": "ullamco officia esse",
                "position": 82465766
            }
        ],
        "type": "occaecat do"
    },
    "FakerInterface": {
        "finance": "696.47",
        "paragraphs": "Molestiae tempora eligendi omnis quisquam. Quos nihil dolor voluptatibus velit nobis culpa deleniti. Reprehenderit in nisi et. Quia odio et inventore eligendi in deserunt id. Sit odio quia vitae provident quo provident molestiae.\n \rPariatur quos est quod laborum. Quisquam esse quia expedita commodi. Tempora ut exercitationem doloribus harum. Sunt omnis et accusantium et quia quos sequi molestiae. Enim necessitatibus molestiae.\n \rEligendi rerum excepturi et laudantium fuga similique fugit corporis voluptatem. Esse nobis et sint magnam aut. Dolores maiores incidunt occaecati iusto laborum. Quia deleniti dolorem quibusdam id veniam perspiciatis et nisi. Corporis laboriosam esse. Soluta accusamus officiis ut excepturi blanditiis libero ut.",
        "word": "qui"
    },
    "LangSwitch": {
        "isActive": "yes",
        "languages": [
            {
                "label": "velit Excepteur consectetur eiusmod",
                "path": "ad"
            },
            {
                "label": "sunt",
                "path": "est"
            },
            {
                "label": "eu nulla mollit",
                "path": "ut dolore amet"
            },
            {
                "label": "commodo",
                "path": "cillum "
            }
        ],
        "type": "Enim tempore non voluptas quia vitae ipsam. Necessitatibus et dolor adipisci dolores sunt non explicabo occaecati. Nesciunt et sint est asperiores sit voluptatum mollitia enim iste. Nesciunt minima sequi voluptas optio aut voluptatem. Eligendi voluptates iste eius iure commodi molestiae. Voluptas quo ex reprehenderit ipsa incidunt corporis vel in."
    },
    "MultiFileInterface": {
        ...
    }
}
```

### HTTP Api
This command creates a server which then can be accessed from you App. By passing the interface name to the route,
data with the same structure as the interface is served.

```bash
    fakealot api --port 3000 --dir ./SRC --tsconfig ./tsconfig.json
```
now by visting `http://localhost:3000/api/schema/{INTERFACENAME}` you'll get some mocked data.

__Interface__
```typescript
export default interface LangSwitch {
    /**
     * Type definition
     * @faker lorem.paragraph
     */
    type: string;

    /**
     * Type definition
     * @pattern yes|no
     */
    isActive: string;
    
    languages: ILink[];
}

export interface ILink {
    path: string;
    label: string;
    external?: boolean;
    icon?: IIcon;
}

export interface IIcon {
    symbol: string;
    size: string;
    dynamicSize?: boolean;
}

```

__HTTP Response__
```json
{
    "isActive": "no",
    "languages": [
        {
            "label": "irure Exce",
            "path": "Excepteur"
        },
        {
            "label": "minim incididunt proident",
            "path": "elit exercitation"
        },
        {
            "label": "Lorem commodo",
            "path": "exercitation occaecat laborum"
        },
        {
            "label": "ea sit nostrud aute",
            "path": "aute"
        }
    ],
    "type": "Culpa nihil quia quis porro voluptatem vel. Libero fugiat doloremque deserunt quidem totam aperiam tempore. Reprehenderit rem cumque quia delectus perspiciatis sunt et. Et officia repellat. Assumenda excepturi sunt et aut corporis cumque quos distinctio. Ab quia autem consectetur occaecati nemo molestiae nisi temporibus soluta."
}
```
