import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'Recognition',
                title    : 'Recognition',
                translate: 'NAV.SAMPLE.TITLE',
                type     : 'item',
                icon     : 'remove_red_eye',
                url      : '/templates/recognition',
            },
            
        ]
    },
    {
        id       : 'Manage',
        title    : 'Manage',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'newTemplate',
                title    : 'New Template',
                translate: 'NAV.SAMPLE.TITLE',
                type     : 'item',
                icon     : 'add_box',
                url      : '/templates/new-template',
            }
          
        ]
    }
];
