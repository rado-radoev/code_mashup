import collections

inventory = dict()
inventory['all'] = {'children' : {}}
inventory['all']['children'] = {'soc' : {'ctx_infra' : {}}, 'phx': {'ctx_infra' : {}}, 'rsm': {'ctx_infra' : {}}}
inventory['all']['children']['soc'] = {'ctx_infra' : {}}
inventory['all']['children']['soc']['ctx_infra'] = {'children' : {}}
inventory['all']['children']['soc']['ctx_infra']['children'] = {'ctx_dc' : {}}
inventory['all']['children']['soc']['ctx_infra']['children']['ctx_dc'] = {'hosts' : ['pphxctxdc1', 'pphxctxdc2']}


def update_nested_dict(d, other):
    for k, v in other.items():
        if isinstance(v, collections.Mapping):
            d_v = d.get(k)
            if isinstance(d_v, collections.Mapping):
                update_nested_dict(d_v, v)
            else:
                d[k] = v.copy()
        else:
            d[k] = v

soc_new = {'ctx_jump' : [ 'ctxjump1', 'ctxjump2' ]}
update_nested_dict(inventory['all']['children']['soc'], soc_new)

print(inventory['all']['children']['soc']['ctx_jump'])